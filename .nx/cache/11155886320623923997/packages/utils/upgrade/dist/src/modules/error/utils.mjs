class UnexpectedError extends Error {
    constructor(){
        super('Unexpected Error');
    }
}
class NPMCandidateNotFoundError extends Error {
    constructor(target, message = `Couldn't find a valid NPM candidate for "${target}"`){
        super(message);
        this.target = target;
    }
}
class AbortedError extends Error {
    constructor(message = 'Upgrade aborted'){
        super(message);
    }
}
const unknownToError = (e)=>{
    if (e instanceof Error) {
        return e;
    }
    if (typeof e === 'string') {
        return new Error(e);
    }
    return new UnexpectedError();
};

export { AbortedError, NPMCandidateNotFoundError, UnexpectedError, unknownToError };
//# sourceMappingURL=utils.mjs.map
