import { objectType, nonNull } from 'nexus';
import { pipe, prop, defaultTo } from 'lodash/fp';

var relationResponseCollection = (({ strapi })=>{
    const { naming } = strapi.plugin('graphql').service('utils');
    return {
        /**
     * Build a type definition for a content API relation's collection response for a given content type
     */ buildRelationResponseCollectionDefinition (contentType) {
            const name = naming.getRelationResponseCollectionName(contentType);
            const typeName = naming.getTypeName(contentType);
            return objectType({
                name,
                definition (t) {
                    t.nonNull.list.field('nodes', {
                        type: nonNull(typeName),
                        resolve: pipe(prop('nodes'), defaultTo([]))
                    });
                    if (strapi.plugin('graphql').config('v4CompatibilityMode', false)) {
                        t.nonNull.list.field('data', {
                            deprecation: 'Use `nodes` field instead',
                            type: nonNull(typeName),
                            resolve: pipe(prop('nodes'), defaultTo([]))
                        });
                    }
                }
            });
        }
    };
});

export { relationResponseCollection as default };
//# sourceMappingURL=relation-response-collection.mjs.map
