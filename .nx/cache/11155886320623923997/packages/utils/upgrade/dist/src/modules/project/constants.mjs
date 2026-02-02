const PROJECT_PACKAGE_JSON = 'package.json';
const PROJECT_APP_ALLOWED_ROOT_PATHS = [
    'src',
    'config',
    'public'
];
const PROJECT_PLUGIN_ALLOWED_ROOT_PATHS = [
    'admin',
    'server'
];
const PROJECT_PLUGIN_ROOT_FILES = [
    'strapi-admin.js',
    'strapi-server.js'
];
const PROJECT_CODE_EXTENSIONS = [
    // Source files
    'js',
    'mjs',
    'ts',
    // React files
    'jsx',
    'tsx'
];
const PROJECT_JSON_EXTENSIONS = [
    'json'
];
const PROJECT_ALLOWED_EXTENSIONS = [
    ...PROJECT_CODE_EXTENSIONS,
    ...PROJECT_JSON_EXTENSIONS
];
const SCOPED_STRAPI_PACKAGE_PREFIX = '@strapi/';
const STRAPI_DEPENDENCY_NAME = `${SCOPED_STRAPI_PACKAGE_PREFIX}strapi`;

export { PROJECT_ALLOWED_EXTENSIONS, PROJECT_APP_ALLOWED_ROOT_PATHS, PROJECT_CODE_EXTENSIONS, PROJECT_JSON_EXTENSIONS, PROJECT_PACKAGE_JSON, PROJECT_PLUGIN_ALLOWED_ROOT_PATHS, PROJECT_PLUGIN_ROOT_FILES, SCOPED_STRAPI_PACKAGE_PREFIX, STRAPI_DEPENDENCY_NAME };
//# sourceMappingURL=constants.mjs.map
