'use strict';

var path = require('node:path');
var constants = require('./constants.js');

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
            formatted = formatted.replace(new RegExp(`\\.${constants.CODEMOD_EXTENSION}$`, 'i'), '');
        }
        if (stripKind) {
            formatted = formatted.replace(`.${constants.CODEMOD_CODE_SUFFIX}`, '').replace(`.${constants.CODEMOD_JSON_SUFFIX}`, '');
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

exports.Codemod = Codemod;
exports.codemodFactory = codemodFactory;
//# sourceMappingURL=codemod.js.map
