'use strict';

var assert = require('node:assert');
var fp = require('lodash/fp');
var node = require('esbuild-register/dist/node');
var transformApi = require('../../json/transform-api.js');
var file = require('../../json/file.js');

const transformJSON = async (codemodPath, paths, config)=>{
    const { dry } = config;
    const startTime = process.hrtime();
    const report = {
        ok: 0,
        nochange: 0,
        skip: 0,
        error: 0,
        timeElapsed: '',
        stats: {}
    };
    /**
   * Why do we need to include node_modules (hookIgnoreNodeModules) and specify a matcher (hookMatcher) to esbuild?
   *
   * When using tools like npx or dlx, the execution context is different from when running the program in a local
   * project. npx and dlx run the commands in a temporary installation, which is isolated from local project files.
   *
   * When hookIgnoreNodeModules is not specified (or set to true), esbuild-register instructs
   * Pirates (https://github.com/danez/pirates) to not transpile any files that come from node_modules.
   *
   * Now, when using npx or dlx to run a script, its location can be seen as "external" because it's not part of
   * the temporary environment where npx or dlx execute. Therefore, it's considered to be part of node_modules.
   *
   * Due to this, if hookIgnoreNodeModules is set to true or left unspecified,
   * esbuild-register won't try to compile them upon require.
   *
   * hookMatcher is added to make sure we're not matching anything else than our codemod in external directories.
   */ const esbuildOptions = {
        extensions: [
            '.js',
            '.mjs',
            '.ts'
        ],
        hookIgnoreNodeModules: false,
        hookMatcher: fp.isEqual(codemodPath)
    };
    const { unregister } = node.register(esbuildOptions);
    const module = require(codemodPath);
    unregister();
    const codemod = typeof module.default === 'function' ? module.default : module;
    assert(typeof codemod === 'function', `Codemod must be a function. Found ${typeof codemod}`);
    for (const path of paths){
        try {
            const json = await file.readJSON(path);
            // Make sure the JSON value is a JSON object
            assert(typeof json === 'object' && !Array.isArray(json) && json !== null);
            // TODO: Optimize the API to limit parse/stringify operations
            const file$1 = {
                path,
                json
            };
            const params = {
                cwd: config.cwd,
                json: transformApi.createJSONTransformAPI
            };
            const out = await codemod(file$1, params);
            if (out === undefined) {
                report.error += 1;
            } else if (!fp.isEqual(json, out)) {
                if (!dry) {
                    await file.saveJSON(path, out);
                }
                report.ok += 1;
            } else {
                report.nochange += 1;
            }
        } catch  {
            report.error += 1;
        }
    }
    const endTime = process.hrtime(startTime);
    report.timeElapsed = (endTime[0] + endTime[1] / 1e9).toFixed(3);
    return report;
};

exports.transformJSON = transformJSON;
//# sourceMappingURL=transform.js.map
