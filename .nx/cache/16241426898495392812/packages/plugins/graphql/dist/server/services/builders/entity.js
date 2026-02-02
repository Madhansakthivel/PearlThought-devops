'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');

var entity = (({ strapi })=>{
    const { naming } = strapi.plugin('graphql').service('utils');
    return {
        /**
     * Build a higher level type for a content type which contains the attributes, the ID and the metadata
     * @param {object} contentType The content type which will be used to build its entity type
     * @return {NexusObjectTypeDef}
     */ buildEntityDefinition (contentType) {
            const { attributes } = contentType;
            const name = naming.getEntityName(contentType);
            const typeName = naming.getTypeName(contentType);
            return nexus.objectType({
                name,
                definition (t) {
                    // Keep the ID attribute at the top level
                    t.id('id', {
                        resolve: fp.prop('id')
                    });
                    if (!fp.isEmpty(attributes)) {
                        // Keep the fetched object into a dedicated `attributes` field
                        t.field('attributes', {
                            type: typeName,
                            resolve: fp.identity
                        });
                    }
                }
            });
        }
    };
});

module.exports = entity;
//# sourceMappingURL=entity.js.map
