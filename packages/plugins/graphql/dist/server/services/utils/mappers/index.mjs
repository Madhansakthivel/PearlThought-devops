import strapiScalarToGraphQLScalar from './strapi-scalar-to-graphql-scalar.mjs';
import graphQLFiltersToStrapiQuery from './graphql-filters-to-strapi-query.mjs';
import graphqlScalarToOperators from './graphql-scalar-to-operators.mjs';
import entityToResponseEntity from './entity-to-response-entity.mjs';

var mappers = ((context)=>({
        ...strapiScalarToGraphQLScalar(context),
        ...graphQLFiltersToStrapiQuery(context),
        ...graphqlScalarToOperators(context),
        ...entityToResponseEntity()
    }));

export { mappers as default };
//# sourceMappingURL=index.mjs.map
