'use strict';

var nexus = require('nexus');

var publicationStatus = (({ strapi })=>{
    const { PUBLICATION_STATUS_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return {
        /**
     * An enum type definition representing a publication status
     * @type {NexusEnumTypeDef}
     */ PublicationStatus: nexus.enumType({
            name: PUBLICATION_STATUS_TYPE_NAME,
            members: {
                DRAFT: 'draft',
                PUBLISHED: 'published'
            }
        })
    };
});

module.exports = publicationStatus;
//# sourceMappingURL=publication-status.js.map
