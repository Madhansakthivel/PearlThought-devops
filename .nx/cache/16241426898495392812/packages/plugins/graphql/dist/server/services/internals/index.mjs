import args from './args/index.mjs';
import scalars from './scalars/index.mjs';
import types from './types/index.mjs';
import helpers from './helpers/index.mjs';

var internals = ((context)=>({
        args: args(context),
        scalars: scalars(),
        buildInternalTypes: types(context),
        helpers: helpers(context)
    }));

export { internals as default };
//# sourceMappingURL=index.mjs.map
