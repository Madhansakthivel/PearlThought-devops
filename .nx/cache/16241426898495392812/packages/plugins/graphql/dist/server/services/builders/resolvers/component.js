'use strict';

var componentResolvers = (({ strapi })=>({
        buildComponentResolver ({ contentTypeUID, attributeName }) {
            const { transformArgs } = strapi.plugin('graphql').service('builders').utils;
            return async (parent, args, ctx)=>{
                const contentType = strapi.getModel(contentTypeUID);
                const { component: componentName } = contentType.attributes[attributeName];
                const component = strapi.getModel(componentName);
                const transformedArgs = transformArgs(args, {
                    contentType: component,
                    usePagination: true
                });
                await strapi.contentAPI.validate.query(transformedArgs, component, {
                    auth: ctx?.state?.auth
                });
                const sanitizedQuery = await strapi.contentAPI.sanitize.query(transformedArgs, component, {
                    auth: ctx?.state?.auth
                });
                const dbQuery = strapi.get('query-params').transform(component.uid, sanitizedQuery);
                return strapi.db?.query(contentTypeUID).load(parent, attributeName, dbQuery);
            };
        }
    }));

module.exports = componentResolvers;
//# sourceMappingURL=component.js.map
