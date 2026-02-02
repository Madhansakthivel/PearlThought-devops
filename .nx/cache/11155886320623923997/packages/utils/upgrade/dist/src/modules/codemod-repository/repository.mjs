import assert from 'node:assert';
import fse from 'fs-extra';
import semver from 'semver';
import path from 'node:path';
import { codemodFactory } from '../codemod/codemod.mjs';
import { CODEMOD_FILE_REGEXP, CODEMOD_ALLOWED_SUFFIXES } from '../codemod/constants.mjs';
import { semVerFactory } from '../version/semver.mjs';
import { isRangeInstance } from '../version/range.mjs';
import { INTERNAL_CODEMODS_DIRECTORY } from './constants.mjs';

class CodemodRepository {
    refresh() {
        this.refreshAvailableVersions();
        this.refreshAvailableFiles();
        return this;
    }
    count(version) {
        return this.findByVersion(version).length;
    }
    versionExists(version) {
        return version.raw in this.groups;
    }
    has(uid) {
        const result = this.find({
            uids: [
                uid
            ]
        });
        if (result.length !== 1) {
            return false;
        }
        const { codemods } = result[0];
        return codemods.length === 1 && codemods[0].uid === uid;
    }
    find(q) {
        const entries = Object.entries(this.groups);
        return entries// Filter by range if provided in the query
        .filter(maybeFilterByRange)// Transform version/codemods tuples into regular objects
        .map(([version, codemods])=>({
                version: semVerFactory(version),
                // Filter by UID if provided in the query
                codemods: codemods.filter(maybeFilterByUIDs)
            }))// Only return groups with at least 1 codemod
        .filter(({ codemods })=>codemods.length > 0);
        function maybeFilterByRange([version]) {
            if (!isRangeInstance(q.range)) {
                return true;
            }
            return q.range.test(version);
        }
        function maybeFilterByUIDs(codemod) {
            if (q.uids === undefined) {
                return true;
            }
            return q.uids.includes(codemod.uid);
        }
    }
    findByVersion(version) {
        const literalVersion = version.raw;
        const codemods = this.groups[literalVersion];
        return codemods ?? [];
    }
    findAll() {
        const entries = Object.entries(this.groups);
        return entries.map(([version, codemods])=>({
                version: semVerFactory(version),
                codemods
            }));
    }
    refreshAvailableVersions() {
        this.versions = fse.readdirSync(this.cwd) // Only keep root directories
        .filter((filename)=>fse.statSync(path.join(this.cwd, filename)).isDirectory())// Paths should be valid semver
        .filter((filename)=>semver.valid(filename) !== null)// Transform files names to SemVer instances
        .map((version)=>semVerFactory(version))// Sort versions in ascending order
        .sort(semver.compare);
        return this;
    }
    refreshAvailableFiles() {
        this.groups = {};
        for (const version of this.versions){
            this.refreshAvailableFilesForVersion(version);
        }
    }
    refreshAvailableFilesForVersion(version) {
        const literalVersion = version.raw;
        const versionDirectory = path.join(this.cwd, literalVersion);
        // Ignore obsolete versions
        if (!fse.existsSync(versionDirectory)) {
            return;
        }
        this.groups[literalVersion] = fse.readdirSync(versionDirectory)// Make sure the filenames are valid codemod files
        .filter((filename)=>fse.statSync(path.join(versionDirectory, filename)).isFile()).filter((filename)=>CODEMOD_FILE_REGEXP.test(filename))// Transform the filenames into Codemod instances
        .map((filename)=>{
            const kind = parseCodemodKindFromFilename(filename);
            const baseDirectory = this.cwd;
            return codemodFactory({
                kind,
                baseDirectory,
                version,
                filename
            });
        });
    }
    constructor(cwd){
        assert(fse.existsSync(cwd), `Invalid codemods directory provided "${cwd}"`);
        this.cwd = cwd;
        this.groups = {};
        this.versions = [];
    }
}
const parseCodemodKindFromFilename = (filename)=>{
    const kind = filename.split('.').at(-2);
    assert(kind !== undefined);
    assert(CODEMOD_ALLOWED_SUFFIXES.includes(kind));
    return kind;
};
const codemodRepositoryFactory = (cwd = INTERNAL_CODEMODS_DIRECTORY)=>{
    return new CodemodRepository(cwd);
};

export { CodemodRepository, codemodRepositoryFactory, parseCodemodKindFromFilename };
//# sourceMappingURL=repository.mjs.map
