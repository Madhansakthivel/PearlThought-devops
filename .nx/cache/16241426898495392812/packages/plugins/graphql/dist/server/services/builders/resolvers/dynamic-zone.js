'use strict';

var dynamicZoneResolvers = (({ strapi })=>({
        buildDynamicZoneResolver ({ contentTypeUID, attributeName }) {
            return async (parent)=>{
                return strapi.db?.query(contentTypeUID).load(parent, attributeName);
            };
        }
    }));

module.exports = dynamicZoneResolvers;
//# sourceMappingURL=dynamic-zone.js.map
