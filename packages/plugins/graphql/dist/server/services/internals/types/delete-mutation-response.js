'use strict';

var nexus = require('nexus');

var buildDeleteMutationResponse = (({ strapi })=>{
    const { DELETE_MUTATION_RESPONSE_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return {
        DeleteMutationResponse: nexus.objectType({
            name: DELETE_MUTATION_RESPONSE_TYPE_NAME,
            definition (t) {
                t.nonNull.id('documentId');
            }
        })
    };
});

module.exports = buildDeleteMutationResponse;
//# sourceMappingURL=delete-mutation-response.js.map
