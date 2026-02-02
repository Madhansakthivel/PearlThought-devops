import { AbortedError } from '../../../modules/error/utils.mjs';
import { highlight, version } from '../../../modules/format/formats.mjs';
import { semVerFactory } from '../../../modules/version/semver.mjs';
import { rangeFactory } from '../../../modules/version/range.mjs';
import { ReleaseType } from '../../../modules/version/types.mjs';

/**
 * Handles the upgrade prompts when using the latest tag.
 *
 * - checks if an upgrade involves a major bump, warning and asking for user confirmation before proceeding
 */ const latest = async (upgrader, options)=>{
    // Exit if the upgrade target isn't the latest tag
    if (options.target !== ReleaseType.Latest) {
        return;
    }
    // Retrieve utilities from the upgrader instance
    const npmPackage = upgrader.getNPMPackage();
    const target = upgrader.getTarget();
    const project = upgrader.getProject();
    const { strapiVersion: current } = project;
    // Pre-formatted strings used in logs
    const fTargetMajor = highlight(`v${target.major}`);
    const fCurrentMajor = highlight(`v${current.major}`);
    const fTarget = version(target);
    const fCurrent = version(current);
    // Flags
    const isMajorUpgrade = target.major > current.major;
    // Handle potential major upgrade, warns, and asks for confirmation to proceed
    if (isMajorUpgrade) {
        options.logger.warn(`Detected a major upgrade for the "${highlight(ReleaseType.Latest)}" tag: ${fCurrent} > ${fTarget}`);
        // Find the latest release in between the current one and the next major
        const newerPackageRelease = npmPackage.findVersionsInRange(rangeFactory(`>${current.raw} <${target.major}`)).at(-1);
        // If the project isn't on the latest version for the current major, emit a warning
        if (newerPackageRelease) {
            const fLatest = version(semVerFactory(newerPackageRelease.version));
            options.logger.warn(`It's recommended to first upgrade to the latest version of ${fCurrentMajor} (${fLatest}) before upgrading to ${fTargetMajor}.`);
        }
        const proceedAnyway = await upgrader.confirm(`I know what I'm doing. Proceed anyway!`);
        if (!proceedAnyway) {
            throw new AbortedError();
        }
    }
};

export { latest };
//# sourceMappingURL=latest.mjs.map
