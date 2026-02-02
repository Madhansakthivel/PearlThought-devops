import { admin } from './admin-permissions.mjs';
export { app } from './admin-permissions.mjs';
import { contentManager } from './content-manager-permissions.mjs';
import { contentTypeBuilder } from './content-type-builder-permissions.mjs';
import { documentation } from './documentation-permissions.mjs';

// TODO: this should be called userPermissions
const allPermissions = [
    ...admin,
    ...contentManager,
    ...contentTypeBuilder,
    ...documentation
];

export { admin, allPermissions, contentManager, contentTypeBuilder };
//# sourceMappingURL=index.mjs.map
