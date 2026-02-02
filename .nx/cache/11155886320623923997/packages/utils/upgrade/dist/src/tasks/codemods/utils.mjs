import path from 'node:path';
import 'node:assert';
import 'fs-extra';
import 'semver';
import { isSemverInstance } from '../../modules/version/semver.mjs';
import { isRangeInstance, rangeFactory } from '../../modules/version/range.mjs';
import { ReleaseType } from '../../modules/version/types.mjs';
import 'fast-glob';
import 'jscodeshift/src/Runner';
import 'lodash/fp';
import 'esbuild-register/dist/node';
import '../../modules/project/constants.mjs';
import { isApplicationProject } from '../../modules/project/utils.mjs';

const resolvePath = (cwd)=>path.resolve(cwd ?? process.cwd());
const getRangeFromTarget = (currentVersion, target)=>{
    if (isSemverInstance(target)) {
        return rangeFactory(target);
    }
    const { major, minor, patch } = currentVersion;
    switch(target){
        case ReleaseType.Latest:
            throw new Error("Can't use <latest> to create a codemods range: not implemented");
        case ReleaseType.Major:
            return rangeFactory(`${major}`);
        case ReleaseType.Minor:
            return rangeFactory(`${major}.${minor}`);
        case ReleaseType.Patch:
            return rangeFactory(`${major}.${minor}.${patch}`);
        default:
            throw new Error(`Invalid target set: ${target}`);
    }
};
const findRangeFromTarget = (project, target)=>{
    // If a range is manually defined, use it
    if (isRangeInstance(target)) {
        return target;
    }
    // If the current project is a Strapi application
    // Get the range from the given target
    if (isApplicationProject(project)) {
        return getRangeFromTarget(project.strapiVersion, target);
    }
    // Else, if the project is a Strapi plugin or anything else
    // Set the range to match any version
    return rangeFactory('*');
};

export { findRangeFromTarget, getRangeFromTarget, resolvePath };
//# sourceMappingURL=utils.mjs.map
