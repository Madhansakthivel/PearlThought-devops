'use strict';

var utils = require('@strapi/utils');

const { ValidationError } = utils.errors;
const EQ_FIELD_NAME = 'eq';
var eqOperator = (({ strapi })=>({
        fieldName: EQ_FIELD_NAME,
        strapiOperator: '$eq',
        add (t, type) {
            const { GRAPHQL_SCALARS } = strapi.plugin('graphql').service('constants');
            if (!GRAPHQL_SCALARS.includes(type)) {
                throw new ValidationError(`Can't use "${EQ_FIELD_NAME}" operator. "${type}" is not a valid scalar`);
            }
            t.field(EQ_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = eqOperator;
//# sourceMappingURL=eq.js.map
