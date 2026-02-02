'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');

var relationResponseCollection = (({ strapi })=>{
    const { naming } = strapi.plugin('graphql').service('utils');
    return {
        /**
     * Build a type definition for a content API relation's collection response for a given content type
     */ buildRelationResponseCollectionDefinition (contentType) {
            const name = naming.getRelationResponseCollectionName(contentType);
            const typeName = naming.getTypeName(contentType);
            return nexus.objectType({
                name,
                definition (t) {
                    t.nonNull.list.field('nodes', {
                        type: nexus.nonNull(typeName),
                        resolve: fp.pipe(fp.prop('nodes'), fp.defaultTo([]))
                    });
                    if (strapi.plugin('graphql').config('v4CompatibilityMode', false)) {
                        t.nonNull.list.field('data', {
                            deprecation: 'Use `nodes` field instead',
                            type: nexus.nonNull(typeName),
                            resolve: fp.pipe(fp.prop('nodes'), fp.defaultTo([]))
                        });
                    }
                }
            });
        }
    };
});

module.exports = relationResponseCollection;
//# sourceMappingURL=relation-response-collection.js.map
