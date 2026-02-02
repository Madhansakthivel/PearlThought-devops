import { mapValues, map, get } from 'lodash/fp';

var graphqlScalarToOperators = (({ strapi })=>({
        graphqlScalarToOperators (graphqlScalar) {
            const { GRAPHQL_SCALAR_OPERATORS } = strapi.plugin('graphql').service('constants');
            const { operators } = strapi.plugin('graphql').service('builders').filters;
            const associations = mapValues(map((operatorName)=>operators[operatorName]), GRAPHQL_SCALAR_OPERATORS);
            return get(graphqlScalar, associations);
        }
    }));

export { graphqlScalarToOperators as default };
//# sourceMappingURL=graphql-scalar-to-operators.mjs.map
