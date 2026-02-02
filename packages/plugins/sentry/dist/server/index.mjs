import bootstrap from './bootstrap.mjs';
import services from './services/index.mjs';
import config from './config.mjs';

var index = (()=>({
        bootstrap,
        config,
        services
    }));

export { index as default };
//# sourceMappingURL=index.mjs.map
