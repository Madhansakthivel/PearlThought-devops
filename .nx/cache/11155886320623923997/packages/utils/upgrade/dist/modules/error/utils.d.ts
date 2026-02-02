import type { Version } from '../version';
export declare class UnexpectedError extends Error {
    constructor();
}
export declare class NPMCandidateNotFoundError extends Error {
    target: Version.SemVer | Version.Range | Version.ReleaseType;
    constructor(target: Version.SemVer | Version.Range | Version.ReleaseType, message?: string);
}
export declare class AbortedError extends Error {
    constructor(message?: string);
}
export declare const unknownToError: (e: unknown) => Error;
//# sourceMappingURL=utils.d.ts.map