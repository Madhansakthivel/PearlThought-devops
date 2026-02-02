import { difference, get } from 'lodash/fp';
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;
var strapiScalarToGraphQLScalar = (({ strapi })=>{
    const { STRAPI_SCALARS, SCALARS_ASSOCIATIONS } = strapi.plugin('graphql').service('constants');
    const missingStrapiScalars = difference(STRAPI_SCALARS, Object.keys(SCALARS_ASSOCIATIONS));
    if (missingStrapiScalars.length > 0) {
        throw new ApplicationError('Some Strapi scalars are not handled in the GraphQL scalars mapper');
    }
    return {
        /**
     * Used to transform a Strapi scalar type into its GraphQL equivalent
     */ strapiScalarToGraphQLScalar (strapiScalar) {
            return get(strapiScalar, SCALARS_ASSOCIATIONS);
        }
    };
});

export { strapiScalarToGraphQLScalar as default };
//# sourceMappingURL=strapi-scalar-to-graphql-scalar.mjs.map
