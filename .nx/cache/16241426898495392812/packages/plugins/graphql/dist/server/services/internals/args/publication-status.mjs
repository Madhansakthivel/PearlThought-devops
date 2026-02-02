import { arg } from 'nexus';

var publicationStatus = (({ strapi })=>{
    const { PUBLICATION_STATUS_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return arg({
        type: PUBLICATION_STATUS_TYPE_NAME,
        default: 'published'
    });
});

export { publicationStatus as default };
//# sourceMappingURL=publication-status.mjs.map
