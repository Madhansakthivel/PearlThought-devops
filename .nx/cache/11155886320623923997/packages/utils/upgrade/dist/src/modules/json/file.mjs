import fse from 'fs-extra';

const readJSON = async (path)=>{
    const buffer = await fse.readFile(path);
    return JSON.parse(buffer.toString());
};
const saveJSON = async (path, json)=>{
    const jsonAsString = `${JSON.stringify(json, null, 2)}\n`;
    await fse.writeFile(path, jsonAsString);
};

export { readJSON, saveJSON };
//# sourceMappingURL=file.mjs.map
