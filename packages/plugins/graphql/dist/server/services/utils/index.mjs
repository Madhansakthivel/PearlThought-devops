import mappers from './mappers/index.mjs';
import attributes from './attributes.mjs';
import naming from './naming.mjs';
import playground from './playground.mjs';

var utils = ((context)=>({
        playground: playground(),
        naming: naming(context),
        attributes: attributes(context),
        mappers: mappers(context)
    }));

export { utils as default };
//# sourceMappingURL=index.mjs.map
