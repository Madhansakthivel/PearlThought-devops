'use strict';

var adminPermissions = require('./admin-permissions.js');
var contentManagerPermissions = require('./content-manager-permissions.js');
var contentTypeBuilderPermissions = require('./content-type-builder-permissions.js');
var documentationPermissions = require('./documentation-permissions.js');

// TODO: this should be called userPermissions
const allPermissions = [
    ...adminPermissions.admin,
    ...contentManagerPermissions.contentManager,
    ...contentTypeBuilderPermissions.contentTypeBuilder,
    ...documentationPermissions.documentation
];

exports.admin = adminPermissions.admin;
exports.app = adminPermissions.app;
exports.contentManager = contentManagerPermissions.contentManager;
exports.contentTypeBuilder = contentTypeBuilderPermissions.contentTypeBuilder;
exports.allPermissions = allPermissions;
//# sourceMappingURL=index.js.map
