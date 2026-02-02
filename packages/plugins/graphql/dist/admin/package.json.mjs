var name = "@strapi/plugin-graphql";
var version = "5.34.0";
var description = "Adds GraphQL endpoint with default API methods.";
var repository = {
    type: "git",
    url: "https://github.com/strapi/strapi.git",
    directory: "packages/plugins/graphql"
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
var exports = {
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
    "dist/",
    "strapi-server.js"
];
var scripts = {
    build: "run -T npm-run-all clean --parallel build:code build:types",
    "build:code": "run -T rollup -c",
    "build:types": "run -T run-p build:types:server build:types:admin",
    "build:types:server": "run -T tsc -p server/tsconfig.build.json --emitDeclarationOnly",
    "build:types:admin": "run -T tsc -p admin/tsconfig.build.json --emitDeclarationOnly",
    clean: "run -T rimraf ./dist",
    lint: "run -T eslint .",
    "test:unit": "run -T jest --passWithNoTests",
    "test:unit:watch": "run -T jest --watch",
    watch: "run -T rollup -c -w"
};
var dependencies = {
    "@apollo/server": "4.11.0",
    "@as-integrations/koa": "1.1.1",
    "@graphql-tools/schema": "10.0.3",
    "@graphql-tools/utils": "^10.1.3",
    "@koa/cors": "5.0.0",
    "@strapi/design-system": "2.1.2",
    "@strapi/icons": "2.1.2",
    "@strapi/utils": "5.34.0",
    graphql: "^16.8.1",
    "graphql-depth-limit": "^1.1.0",
    "graphql-playground-middleware-koa": "^1.6.21",
    "graphql-scalars": "1.22.2",
    "koa-bodyparser": "4.4.1",
    "koa-compose": "^4.1.0",
    lodash: "4.17.23",
    nexus: "1.3.0",
    pluralize: "8.0.0"
};
var devDependencies = {
    "@strapi/strapi": "5.34.0",
    "@strapi/types": "5.34.0",
    "@types/graphql-depth-limit": "1.1.5",
    "@types/koa-bodyparser": "4.3.12",
    "@types/koa__cors": "5.0.0",
    "cross-env": "^7.0.3",
    "eslint-config-custom": "5.34.0",
    koa: "2.16.3",
    react: "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.22.3",
    "styled-components": "6.1.8",
    tsconfig: "5.34.0",
    typescript: "5.4.4"
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
    displayName: "GraphQL",
    name: "graphql",
    description: "Adds GraphQL endpoint with default API methods.",
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
    exports: exports,
    files: files,
    scripts: scripts,
    dependencies: dependencies,
    devDependencies: devDependencies,
    peerDependencies: peerDependencies,
    engines: engines,
    strapi: strapi
};

export { author, pluginPkg as default, dependencies, description, devDependencies, engines, exports, files, license, maintainers, name, peerDependencies, repository, scripts, strapi, version };
//# sourceMappingURL=package.json.mjs.map
