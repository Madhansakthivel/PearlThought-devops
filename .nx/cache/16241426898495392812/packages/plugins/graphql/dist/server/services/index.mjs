import contentAPI from './content-api/index.mjs';
import typeRegistry from './type-registry.mjs';
import utils from './utils/index.mjs';
import constants from './constants.mjs';
import internals from './internals/index.mjs';
import builders from './builders/index.mjs';
import createExtension from './extension/extension.mjs';
import format from './format/index.mjs';

const services = {
    builders,
    'content-api': contentAPI,
    constants,
    extension: createExtension,
    format,
    internals,
    'type-registry': typeRegistry,
    utils
};

export { services };
//# sourceMappingURL=index.mjs.map
