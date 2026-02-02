'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');
var utils = require('@strapi/utils');

const { ValidationError } = utils.errors;
/**
 * Build an Error object type
 * @return {Object<string, NexusObjectTypeDef>}
 */ var error = (({ strapi })=>{
    const { ERROR_CODES, ERROR_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return nexus.objectType({
        name: ERROR_TYPE_NAME,
        definition (t) {
            t.nonNull.string('code', {
                resolve (parent) {
                    const code = fp.get('code', parent);
                    const isValidPlaceholderCode = Object.values(ERROR_CODES).includes(code);
                    if (!isValidPlaceholderCode) {
                        throw new ValidationError(`"${code}" is not a valid code value`);
                    }
                    return code;
                }
            });
            t.string('message');
        }
    });
});

module.exports = error;
//# sourceMappingURL=error.js.map
