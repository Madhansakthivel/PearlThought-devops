var paginationResolvers = (({ strapi })=>({
        async resolvePagination (parent, _, ctx) {
            const { args, resourceUID } = parent.info;
            const { start, limit } = args;
            const safeLimit = Math.max(limit, 1);
            const contentType = strapi.getModel(resourceUID);
            await strapi.contentAPI.validate.query(args, contentType, {
                auth: ctx?.state?.auth
            });
            const sanitizedQuery = await strapi.contentAPI.sanitize.query(args, contentType, {
                auth: ctx?.state?.auth
            });
            const total = await strapi.documents(resourceUID).count(sanitizedQuery);
            const pageSize = limit === -1 ? total - start : safeLimit;
            const pageCount = limit === -1 ? safeLimit : Math.ceil(total / safeLimit);
            const page = limit === -1 ? safeLimit : Math.floor(start / safeLimit) + 1;
            return {
                total,
                page,
                pageSize,
                pageCount
            };
        }
    }));

export { paginationResolvers as default };
//# sourceMappingURL=pagination.mjs.map
