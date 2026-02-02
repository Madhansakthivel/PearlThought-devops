'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var name = "@strapi/plugin-sentry";
var version = "5.34.0";
var description = "Send Strapi error events to Sentry";
var repository = {
    type: "git",
    url: "https://github.com/strapi/strapi.git",
    directory: "packages/plugins/sentry"
};
var license = "SEE LICENSE IN LICENSE";
var author = {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
};
var maintainers = [
    {
        name: "Strapi Solutions SAS",
        email: "hi@strapi.io",
        url: "https://strapi.io"
    }
];
var exports$1 = {
    "./strapi-admin": {
        types: "./dist/admin/src/index.d.ts",
        source: "./admin/src/index.ts",
        "import": "./dist/admin/index.mjs",
        require: "./dist/admin/index.js",
        "default": "./dist/admin/index.js"
    },
    "./strapi-server": {
        types: "./dist/server/src/index.d.ts",
        source: "./server/src/index.ts",
        "import": "./dist/server/index.mjs",
        require: "./dist/server/index.js",
        "default": "./dist/server/index.js"
    },
    "./package.json": "./package.json"
};
var files = [
    "./dist"
];
var scripts = {
    build: "run -T npm-run-all clean --parallel build:code build:types",
    "build:code": "run -T rollup -c",
    "build:types": "run -T run-p build:types:server build:types:admin",
    "build:types:server": "run -T tsc -p server/tsconfig.build.json --emitDeclarationOnly",
    "build:types:admin": "run -T tsc -p admin/tsconfig.build.json --emitDeclarationOnly",
    clean: "run -T rimraf dist",
    lint: "run -T eslint .",
    "test:unit": "run -T jest",
    "test:unit:watch": "run -T jest --watch",
    watch: "run -T rollup -c -w"
};
var dependencies = {
    "@sentry/node": "7.112.2",
    "@strapi/design-system": "2.1.2",
    "@strapi/icons": "2.1.2"
};
var devDependencies = {
    "@strapi/strapi": "5.34.0",
    react: "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.22.3",
    "styled-components": "6.1.8"
};
var peerDependencies = {
    "@strapi/strapi": "^5.0.0",
    react: "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0",
    "react-router-dom": "^6.0.0",
    "styled-components": "^6.0.0"
};
var engines = {
    node: ">=20.0.0 <=24.x.x",
    npm: ">=6.0.0"
};
var strapi = {
    name: "sentry",
    displayName: "Sentry",
    description: "Send Strapi error events to Sentry.",
    kind: "plugin"
};
var pluginPkg = {
    name: name,
    version: version,
    description: description,
    repository: repository,
    license: license,
    author: author,
    maintainers: maintainers,
    exports: exports$1,
    files: files,
    scripts: scripts,
    dependencies: dependencies,
    devDependencies: devDependencies,
    peerDependencies: peerDependencies,
    engines: engines,
    strapi: strapi
};

exports.author = author;
exports.default = pluginPkg;
exports.dependencies = dependencies;
exports.description = description;
exports.devDependencies = devDependencies;
exports.engines = engines;
exports.exports = exports$1;
exports.files = files;
exports.license = license;
exports.maintainers = maintainers;
exports.name = name;
exports.peerDependencies = peerDependencies;
exports.repository = repository;
exports.scripts = scripts;
exports.strapi = strapi;
exports.version = version;
//# sourceMappingURL=package.json.js.map
