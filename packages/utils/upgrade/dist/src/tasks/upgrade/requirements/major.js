'use strict';

var requirement = require('../../../modules/requirement/requirement.js');
var semver = require('../../../modules/version/semver.js');
require('semver');

const REQUIRE_AVAILABLE_NEXT_MAJOR = requirement.requirementFactory('REQUIRE_AVAILABLE_NEXT_MAJOR', (context)=>{
    const { project, target } = context;
    const currentMajor = project.strapiVersion.major;
    const targetedMajor = target.major;
    if (targetedMajor === currentMajor) {
        throw new Error(`You're already on the latest major version (v${currentMajor})`);
    }
});
const REQUIRE_LATEST_FOR_CURRENT_MAJOR = requirement.requirementFactory('REQUIRE_LATEST_FOR_CURRENT_MAJOR', (context)=>{
    const { project, target, npmVersionsMatches } = context;
    const { major: currentMajor } = project.strapiVersion;
    const invalidMatches = npmVersionsMatches.filter((match)=>semver.semVerFactory(match.version).major === currentMajor);
    if (invalidMatches.length > 0) {
        const invalidVersions = invalidMatches.map((match)=>match.version);
        const invalidVersionsCount = invalidVersions.length;
        throw new Error(`Doing a major upgrade requires to be on the latest v${currentMajor} version, but found ${invalidVersionsCount} versions between the current one and ${target}. Please upgrade to ${invalidVersions.at(-1)} and try again.`);
    }
});

exports.REQUIRE_AVAILABLE_NEXT_MAJOR = REQUIRE_AVAILABLE_NEXT_MAJOR;
exports.REQUIRE_LATEST_FOR_CURRENT_MAJOR = REQUIRE_LATEST_FOR_CURRENT_MAJOR;
//# sourceMappingURL=major.js.map
