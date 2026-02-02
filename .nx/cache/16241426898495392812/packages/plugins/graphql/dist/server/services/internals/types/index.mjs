import pagination from './pagination.mjs';
import buildResponseCollectionMeta from './response-collection-meta.mjs';
import buildDeleteMutationResponse from './delete-mutation-response.mjs';
import publicationStatus from './publication-status.mjs';
import filters from './filters.mjs';
import error from './error.mjs';

var types = ((context)=>()=>{
        const { strapi } = context;
        const { KINDS } = strapi.plugin('graphql').service('constants');
        return {
            [KINDS.internal]: {
                error: error(context),
                pagination: pagination(context),
                responseCollectionMeta: buildResponseCollectionMeta(context),
                deleteDocumentResponse: buildDeleteMutationResponse(context)
            },
            [KINDS.enum]: {
                publicationStatus: publicationStatus(context)
            },
            [KINDS.filtersInput]: {
                ...filters(context)
            }
        };
    });

export { types as default };
//# sourceMappingURL=index.mjs.map
