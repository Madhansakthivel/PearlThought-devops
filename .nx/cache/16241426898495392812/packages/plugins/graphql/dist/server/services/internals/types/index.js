'use strict';

var pagination = require('./pagination.js');
var responseCollectionMeta = require('./response-collection-meta.js');
var deleteMutationResponse = require('./delete-mutation-response.js');
var publicationStatus = require('./publication-status.js');
var filters = require('./filters.js');
var error = require('./error.js');

var types = ((context)=>()=>{
        const { strapi } = context;
        const { KINDS } = strapi.plugin('graphql').service('constants');
        return {
            [KINDS.internal]: {
                error: error(context),
                pagination: pagination(context),
                responseCollectionMeta: responseCollectionMeta(context),
                deleteDocumentResponse: deleteMutationResponse(context)
            },
            [KINDS.enum]: {
                publicationStatus: publicationStatus(context)
            },
            [KINDS.filtersInput]: {
                ...filters(context)
            }
        };
    });

module.exports = types;
//# sourceMappingURL=index.js.map
