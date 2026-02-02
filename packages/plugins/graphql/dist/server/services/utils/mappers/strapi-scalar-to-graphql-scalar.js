'use strict';

var fp = require('lodash/fp');
var utils = require('@strapi/utils');

const { ApplicationError } = utils.errors;
var strapiScalarToGraphQLScalar = (({ strapi })=>{
    const { STRAPI_SCALARS, SCALARS_ASSOCIATIONS } = strapi.plugin('graphql').service('constants');
    const missingStrapiScalars = fp.difference(STRAPI_SCALARS, Object.keys(SCALARS_ASSOCIATIONS));
    if (missingStrapiScalars.length > 0) {
        throw new ApplicationError('Some Strapi scalars are not handled in the GraphQL scalars mapper');
    }
    return {
        /**
     * Used to transform a Strapi scalar type into its GraphQL equivalent
     */ strapiScalarToGraphQLScalar (strapiScalar) {
            return fp.get(strapiScalar, SCALARS_ASSOCIATIONS);
        }
    };
});

module.exports = strapiScalarToGraphQLScalar;
//# sourceMappingURL=strapi-scalar-to-graphql-scalar.js.map
