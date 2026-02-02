import semver from 'semver';
import { ReleaseType } from './types.mjs';

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
    return Object.values(ReleaseType).includes(str);
};

export { isLiteralSemVer, isSemVerReleaseType, isSemverInstance, isValidSemVer, semVerFactory };
//# sourceMappingURL=semver.mjs.map
