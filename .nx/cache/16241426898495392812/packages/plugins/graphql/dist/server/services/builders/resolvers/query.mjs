import { omit } from 'lodash/fp';

var queriesResolvers = (({ strapi })=>({
        buildQueriesResolvers ({ contentType }) {
            const { uid } = contentType;
            return {
                async findMany (parent, args, ctx) {
                    await strapi.contentAPI.validate.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    const sanitizedQuery = await strapi.contentAPI.sanitize.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    return strapi.documents(uid).findMany({
                        status: 'published',
                        ...sanitizedQuery
                    });
                },
                async findFirst (parent, args, ctx) {
                    await strapi.contentAPI.validate.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    const sanitizedQuery = await strapi.contentAPI.sanitize.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    return strapi.documents(uid).findFirst({
                        status: 'published',
                        ...sanitizedQuery
                    });
                },
                async findOne (parent, args, ctx) {
                    const { documentId } = args;
                    await strapi.contentAPI.validate.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    const sanitizedQuery = await strapi.contentAPI.sanitize.query(args, contentType, {
                        auth: ctx?.state?.auth
                    });
                    return strapi.documents(uid).findOne({
                        status: 'published',
                        ...omit([
                            'id',
                            'documentId'
                        ], sanitizedQuery),
                        documentId
                    });
                }
            };
        }
    }));

export { queriesResolvers as default };
//# sourceMappingURL=query.mjs.map
