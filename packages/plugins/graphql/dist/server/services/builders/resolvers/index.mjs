import associationResolvers from './association.mjs';
import queriesResolvers from './query.mjs';
import componentResolvers from './component.mjs';
import dynamicZoneResolvers from './dynamic-zone.mjs';
import paginationResolvers from './pagination.mjs';

var resolvers = ((context)=>({
        // Generics
        ...associationResolvers(context),
        // Builders
        ...queriesResolvers(context),
        ...componentResolvers(context),
        ...dynamicZoneResolvers(context),
        ...paginationResolvers(context)
    }));

export { resolvers as default };
//# sourceMappingURL=index.mjs.map
