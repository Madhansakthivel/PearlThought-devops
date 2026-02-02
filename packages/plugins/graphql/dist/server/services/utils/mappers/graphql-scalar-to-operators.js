'use strict';

var fp = require('lodash/fp');

var graphqlScalarToOperators = (({ strapi })=>({
        graphqlScalarToOperators (graphqlScalar) {
            const { GRAPHQL_SCALAR_OPERATORS } = strapi.plugin('graphql').service('constants');
            const { operators } = strapi.plugin('graphql').service('builders').filters;
            const associations = fp.mapValues(fp.map((operatorName)=>operators[operatorName]), GRAPHQL_SCALAR_OPERATORS);
            return fp.get(graphqlScalar, associations);
        }
    }));

module.exports = graphqlScalarToOperators;
//# sourceMappingURL=graphql-scalar-to-operators.js.map
