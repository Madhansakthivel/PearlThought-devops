import { errors } from '@strapi/utils';

const { ValidationError } = errors;
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

export { eqOperator as default };
//# sourceMappingURL=eq.mjs.map
