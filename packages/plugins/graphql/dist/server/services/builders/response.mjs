import { objectType } from 'nexus';
import { prop } from 'lodash/fp';

var response = (({ strapi })=>{
    const { naming } = strapi.plugin('graphql').service('utils');
    return {
        /**
     * Build a type definition for a content API response for a given content type
     */ buildResponseDefinition (contentType) {
            const name = naming.getEntityResponseName(contentType);
            const typeName = naming.getTypeName(contentType);
            return objectType({
                name,
                definition (t) {
                    t.field('data', {
                        type: typeName,
                        resolve: prop('value')
                    });
                }
            });
        }
    };
});

export { response as default };
//# sourceMappingURL=response.mjs.map
