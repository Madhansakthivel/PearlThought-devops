'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');

var response = (({ strapi })=>{
    const { naming } = strapi.plugin('graphql').service('utils');
    return {
        /**
     * Build a type definition for a content API response for a given content type
     */ buildResponseDefinition (contentType) {
            const name = naming.getEntityResponseName(contentType);
            const typeName = naming.getTypeName(contentType);
            return nexus.objectType({
                name,
                definition (t) {
                    t.field('data', {
                        type: typeName,
                        resolve: fp.prop('value')
                    });
                }
            });
        }
    };
});

module.exports = response;
//# sourceMappingURL=response.js.map
