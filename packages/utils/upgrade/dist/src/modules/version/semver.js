'use strict';

var semver = require('semver');
var types = require('./types.js');

const semVerFactory = (version)=>{
    return new semver.SemVer(version);
};
const isLiteralSemVer = (str)=>{
    const tokens = str.split('.');
    return tokens.length === 3 && tokens.every((token)=>!Number.isNaN(+token) && Number.isInteger(+token));
};
const isValidSemVer = (str)=>semver.valid(str) !== null;
const isSemverInstance = (value)=>{
    return value instanceof semver.SemVer;
};
const isSemVerReleaseType = (str)=>{
    return Object.values(types.ReleaseType).includes(str);
};

exports.isLiteralSemVer = isLiteralSemVer;
exports.isSemVerReleaseType = isSemVerReleaseType;
exports.isSemverInstance = isSemverInstance;
exports.isValidSemVer = isValidSemVer;
exports.semVerFactory = semVerFactory;
//# sourceMappingURL=semver.js.map
