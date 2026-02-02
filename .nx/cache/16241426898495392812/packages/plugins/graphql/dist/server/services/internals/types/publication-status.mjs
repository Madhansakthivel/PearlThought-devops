import { enumType } from 'nexus';

var publicationStatus = (({ strapi })=>{
    const { PUBLICATION_STATUS_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return {
        /**
     * An enum type definition representing a publication status
     * @type {NexusEnumTypeDef}
     */ PublicationStatus: enumType({
            name: PUBLICATION_STATUS_TYPE_NAME,
            members: {
                DRAFT: 'draft',
                PUBLISHED: 'published'
            }
        })
    };
});

export { publicationStatus as default };
//# sourceMappingURL=publication-status.mjs.map
