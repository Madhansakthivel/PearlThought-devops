'use strict';

var fse = require('fs-extra');

const readJSON = async (path)=>{
    const buffer = await fse.readFile(path);
    return JSON.parse(buffer.toString());
};
const saveJSON = async (path, json)=>{
    const jsonAsString = `${JSON.stringify(json, null, 2)}\n`;
    await fse.writeFile(path, jsonAsString);
};

exports.readJSON = readJSON;
exports.saveJSON = saveJSON;
//# sourceMappingURL=file.js.map
