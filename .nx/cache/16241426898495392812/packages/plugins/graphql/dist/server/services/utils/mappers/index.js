'use strict';

var strapiScalarToGraphqlScalar = require('./strapi-scalar-to-graphql-scalar.js');
var graphqlFiltersToStrapiQuery = require('./graphql-filters-to-strapi-query.js');
var graphqlScalarToOperators = require('./graphql-scalar-to-operators.js');
var entityToResponseEntity = require('./entity-to-response-entity.js');

var mappers = ((context)=>({
        ...strapiScalarToGraphqlScalar(context),
        ...graphqlFiltersToStrapiQuery(context),
        ...graphqlScalarToOperators(context),
        ...entityToResponseEntity()
    }));

module.exports = mappers;
//# sourceMappingURL=index.js.map
