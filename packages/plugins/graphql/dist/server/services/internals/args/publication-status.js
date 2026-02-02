'use strict';

var nexus = require('nexus');

var publicationStatus = (({ strapi })=>{
    const { PUBLICATION_STATUS_TYPE_NAME } = strapi.plugin('graphql').service('constants');
    return nexus.arg({
        type: PUBLICATION_STATUS_TYPE_NAME,
        default: 'published'
    });
});

module.exports = publicationStatus;
//# sourceMappingURL=publication-status.js.map
