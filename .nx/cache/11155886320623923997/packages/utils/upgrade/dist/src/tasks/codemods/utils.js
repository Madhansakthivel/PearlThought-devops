'use strict';

var path = require('node:path');
require('node:assert');
require('fs-extra');
require('semver');
var semver = require('../../modules/version/semver.js');
var range = require('../../modules/version/range.js');
var types = require('../../modules/version/types.js');
require('fast-glob');
require('jscodeshift/src/Runner');
require('lodash/fp');
require('esbuild-register/dist/node');
require('../../modules/project/constants.js');
var utils = require('../../modules/project/utils.js');

const resolvePath = (cwd)=>path.resolve(cwd ?? process.cwd());
const getRangeFromTarget = (currentVersion, target)=>{
    if (semver.isSemverInstance(target)) {
        return range.rangeFactory(target);
    }
    const { major, minor, patch } = currentVersion;
    switch(target){
        case types.ReleaseType.Latest:
            throw new Error("Can't use <latest> to create a codemods range: not implemented");
        case types.ReleaseType.Major:
            return range.rangeFactory(`${major}`);
        case types.ReleaseType.Minor:
            return range.rangeFactory(`${major}.${minor}`);
        case types.ReleaseType.Patch:
            return range.rangeFactory(`${major}.${minor}.${patch}`);
        default:
            throw new Error(`Invalid target set: ${target}`);
    }
};
const findRangeFromTarget = (project, target)=>{
    // If a range is manually defined, use it
    if (range.isRangeInstance(target)) {
        return target;
    }
    // If the current project is a Strapi application
    // Get the range from the given target
    if (utils.isApplicationProject(project)) {
        return getRangeFromTarget(project.strapiVersion, target);
    }
    // Else, if the project is a Strapi plugin or anything else
    // Set the range to match any version
    return range.rangeFactory('*');
};

exports.findRangeFromTarget = findRangeFromTarget;
exports.getRangeFromTarget = getRangeFromTarget;
exports.resolvePath = resolvePath;
//# sourceMappingURL=utils.js.map
