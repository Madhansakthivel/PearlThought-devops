import path from 'node:path';
import { CODEMOD_EXTENSION, CODEMOD_CODE_SUFFIX, CODEMOD_JSON_SUFFIX } from './constants.mjs';

class Codemod {
    createUID() {
        const name = this.format({
            stripExtension: true,
            stripKind: true,
            stripHyphens: false
        });
        const kind = this.kind;
        const version = this.version.raw;
        return `${version}-${name}-${kind}`;
    }
    format(options) {
        const { stripExtension = true, stripKind = true, stripHyphens = true } = options ?? {};
        let formatted = this.filename;
        if (stripExtension) {
            formatted = formatted.replace(new RegExp(`\\.${CODEMOD_EXTENSION}$`, 'i'), '');
        }
        if (stripKind) {
            formatted = formatted.replace(`.${CODEMOD_CODE_SUFFIX}`, '').replace(`.${CODEMOD_JSON_SUFFIX}`, '');
        }
        if (stripHyphens) {
            formatted = formatted.replaceAll('-', ' ');
        }
        return formatted;
    }
    constructor(options){
        this.kind = options.kind;
        this.version = options.version;
        this.baseDirectory = options.baseDirectory;
        this.filename = options.filename;
        this.path = path.join(this.baseDirectory, this.version.raw, this.filename);
        this.uid = this.createUID();
    }
}
const codemodFactory = (options)=>new Codemod(options);

export { Codemod, codemodFactory };
//# sourceMappingURL=codemod.mjs.map
