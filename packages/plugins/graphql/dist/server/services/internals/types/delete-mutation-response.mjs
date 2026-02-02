import { objectType } from 'nexus';

var buildDeleteMutationResponse = (({ strapi })=>{
    const { DELETE_MUTATION_RESPONSE_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return {
        DeleteMutationResponse: objectType({
            name: DELETE_MUTATION_RESPONSE_TYPE_NAME,
            definition (t) {
                t.nonNull.id('documentId');
            }
        })
    };
});

export { buildDeleteMutationResponse as default };
//# sourceMappingURL=delete-mutation-response.mjs.map
