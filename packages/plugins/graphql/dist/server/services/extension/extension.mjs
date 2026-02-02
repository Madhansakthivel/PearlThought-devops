import * as nexus from 'nexus';
import { merge } from 'lodash/fp';
import createShadowCRUDManager from './shadow-crud-manager.mjs';

const getDefaultState = ()=>({
        types: [],
        typeDefs: [],
        resolvers: {},
        resolversConfig: {},
        plugins: []
    });
const createExtension = ({ strapi })=>{
    const configs = [];
    return {
        shadowCRUD: createShadowCRUDManager(),
        /**
     * Register a new extension configuration
     */ use (configuration) {
            configs.push(configuration);
            return this;
        },
        /**
     * Convert the registered configuration into a single extension object & return it
     */ generate ({ typeRegistry }) {
            const resolveConfig = (config)=>{
                return typeof config === 'function' ? config({
                    strapi,
                    nexus,
                    typeRegistry
                }) : config;
            };
            // Evaluate & merge every registered configuration object, then return the result
            return configs.reduce((acc, configuration)=>{
                const { types, typeDefs, resolvers, resolversConfig, plugins } = resolveConfig(configuration);
                // Register type definitions
                if (typeof typeDefs === 'string') {
                    acc.typeDefs.push(typeDefs);
                }
                // Register nexus types
                if (Array.isArray(types)) {
                    acc.types.push(...types);
                }
                // Register nexus plugins
                if (Array.isArray(plugins)) {
                    acc.plugins.push(...plugins);
                }
                // Register resolvers
                if (typeof resolvers === 'object') {
                    acc.resolvers = merge(acc.resolvers, resolvers);
                }
                // Register resolvers configuration
                if (typeof resolversConfig === 'object') {
                    // TODO: smarter merge for auth, middlewares & policies
                    acc.resolversConfig = merge(resolversConfig, acc.resolversConfig);
                }
                return acc;
            }, getDefaultState());
        }
    };
};

export { createExtension as default };
//# sourceMappingURL=extension.mjs.map
