var dynamicZoneResolvers = (({ strapi })=>({
        buildDynamicZoneResolver ({ contentTypeUID, attributeName }) {
            return async (parent)=>{
                return strapi.db?.query(contentTypeUID).load(parent, attributeName);
            };
        }
    }));

export { dynamicZoneResolvers as default };
//# sourceMappingURL=dynamic-zone.mjs.map
