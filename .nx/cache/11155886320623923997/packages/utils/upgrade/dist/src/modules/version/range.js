'use strict';

var semver = require('semver');
var types = require('./types.js');
var semver$1 = require('./semver.js');

const rangeFactory = (range)=>{
    return new semver.Range(range);
};
const rangeFromReleaseType = (current, identifier)=>{
    switch(identifier){
        case types.ReleaseType.Latest:
            {
                // Match anything greater than the current version
                return rangeFactory(`>${current.raw}`);
            }
        case types.ReleaseType.Major:
            {
                // For example, 4.15.4 returns 5.0.0
                const nextMajor = semver$1.semVerFactory(current.raw).inc('major');
                // Using only the major version as the upper limit allows any minor,
                // patch, or build version to be taken in the range.
                //
                // For example, if the current version is "4.15.4", incrementing the
                // major version would result in "5.0.0".
                // The generated rule is ">4.15.4 <=5", allowing any version
                // greater than "4.15.4" but less than "6.0.0-0".
                return rangeFactory(`>${current.raw} <=${nextMajor.major}`);
            }
        case types.ReleaseType.Minor:
            {
                // For example, 4.15.4 returns 5.0.0
                const nextMajor = semver$1.semVerFactory(current.raw).inc('major');
                // Using the <major>.<minor>.<patch> version as the upper limit allows any minor,
                // patch, or build versions to be taken in the range.
                //
                // For example, if the current version is "4.15.4", incrementing the
                // major version would result in "5.0.0".
                // The generated rule is ">4.15.4 <5.0.0", allowing any version
                // greater than "4.15.4" but less than "5.0.0".
                return rangeFactory(`>${current.raw} <${nextMajor.raw}`);
            }
        case types.ReleaseType.Patch:
            {
                // For example, 4.15.4 returns 4.16.0
                const nextMinor = semver$1.semVerFactory(current.raw).inc('minor');
                // Using only the minor version as the upper limit allows any patch
                // or build versions to be taken in the range.
                //
                // For example, if the current version is "4.15.4", incrementing the
                // minor version would result in "4.16.0".
                // The generated rule is ">4.15.4 <4.16.0", allowing any version
                // greater than "4.15.4" but less than "4.16.0".
                return rangeFactory(`>${current.raw} <${nextMinor.raw}`);
            }
        default:
            {
                throw new Error('Not implemented');
            }
    }
};
const rangeFromVersions = (currentVersion, target)=>{
    if (semver$1.isSemverInstance(target)) {
        return rangeFactory(`>${currentVersion.raw} <=${target.raw}`);
    }
    if (semver$1.isSemVerReleaseType(target)) {
        return rangeFromReleaseType(currentVersion, target);
    }
    throw new Error(`Invalid target set: ${target}`); // TODO: better errors
};
const isValidStringifiedRange = (str)=>semver.validRange(str) !== null;
const isRangeInstance = (range)=>{
    return range instanceof semver.Range;
};

exports.isRangeInstance = isRangeInstance;
exports.isValidStringifiedRange = isValidStringifiedRange;
exports.rangeFactory = rangeFactory;
exports.rangeFromReleaseType = rangeFromReleaseType;
exports.rangeFromVersions = rangeFromVersions;
//# sourceMappingURL=range.js.map
