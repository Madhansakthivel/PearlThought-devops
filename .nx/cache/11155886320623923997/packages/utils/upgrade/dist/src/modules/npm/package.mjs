import assert from 'node:assert';
import semver from 'semver';
import execa from 'execa';
import { packageManager } from '@strapi/utils';
import { ProxyAgent } from 'undici';
import { NPM_REGISTRY_URL } from './constants.mjs';
import { isLiteralSemVer } from '../version/semver.mjs';

const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
const agent = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;
class Package {
    get isLoaded() {
        return this.npmPackage !== null;
    }
    assertPackageIsLoaded(npmPackage) {
        assert(this.isLoaded, 'The package is not loaded yet');
    }
    getVersionsDict() {
        this.assertPackageIsLoaded(this.npmPackage);
        return this.npmPackage.versions;
    }
    getVersionsAsList() {
        this.assertPackageIsLoaded(this.npmPackage);
        return Object.values(this.npmPackage.versions);
    }
    findVersionsInRange(range) {
        const versions = this.getVersionsAsList();
        return versions// Only select versions matching the upgrade range
        .filter((v)=>range.test(v.version))// Only select supported version format (x.x.x)
        .filter((v)=>isLiteralSemVer(v.version))// Sort in ascending order
        .sort((v1, v2)=>semver.compare(v1.version, v2.version));
    }
    async getRegistryFromPackageManager() {
        try {
            const packageManagerName = await packageManager.getPreferred(this.cwd);
            if (!packageManagerName) return undefined;
            const registryCommands = {
                yarn: [
                    'config',
                    'get',
                    'npmRegistryServer'
                ],
                npm: [
                    'config',
                    'get',
                    'registry'
                ]
            };
            const command = registryCommands[packageManagerName];
            if (!command) {
                this.logger.warn(`Unsupported package manager: ${packageManagerName}`);
                return undefined;
            }
            const { stdout } = await execa(packageManagerName, command, {
                timeout: 10000
            });
            return stdout.trim() || undefined;
        } catch (error) {
            this.logger.warn('Failed to determine registry URL from package manager');
            return undefined;
        }
    }
    async determineRegistryUrl() {
        if (process.env.NPM_REGISTRY_URL) {
            this.logger.debug(`Using NPM_REGISTRY_URL: ${process.env.NPM_REGISTRY_URL}`);
            return process.env.NPM_REGISTRY_URL.replace(/\/$/, '');
        }
        const packageManagerRegistry = await this.getRegistryFromPackageManager();
        if (packageManagerRegistry) {
            this.logger.debug(`Using package manager registry: ${packageManagerRegistry}`);
            return packageManagerRegistry.replace(/\/$/, '');
        }
        this.logger.debug(`Using default registry: ${NPM_REGISTRY_URL}`);
        return NPM_REGISTRY_URL.replace(/\/$/, '');
    }
    findVersion(version) {
        const versions = this.getVersionsAsList();
        return versions.find((npmVersion)=>semver.eq(npmVersion.version, version));
    }
    async refresh() {
        const packageURL = `${await this.determineRegistryUrl()}/${this.name}`;
        const response = await fetch(packageURL, {
            // @ts-expect-error Node.js fetch supports dispatcher (undici extension)
            dispatcher: agent
        });
        // TODO: Use a validation library to make sure the response structure is correct
        assert(response.ok, `Request failed for ${packageURL}`);
        this.npmPackage = await response.json();
        return this;
    }
    versionExists(version) {
        return this.findVersion(version) !== undefined;
    }
    constructor(name, cwd, logger){
        this.name = name;
        this.cwd = cwd;
        this.logger = logger;
        this.npmPackage = null;
    }
}
const npmPackageFactory = (name, cwd, logger)=>new Package(name, cwd, logger);

export { Package, npmPackageFactory };
//# sourceMappingURL=package.mjs.map
