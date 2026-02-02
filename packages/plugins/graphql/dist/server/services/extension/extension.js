'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');
var shadowCrudManager = require('./shadow-crud-manager.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var nexus__namespace = /*#__PURE__*/_interopNamespaceDefault(nexus);

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
        shadowCRUD: shadowCrudManager(),
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
                    nexus: nexus__namespace,
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
                    acc.resolvers = fp.merge(acc.resolvers, resolvers);
                }
                // Register resolvers configuration
                if (typeof resolversConfig === 'object') {
                    // TODO: smarter merge for auth, middlewares & policies
                    acc.resolversConfig = fp.merge(resolversConfig, acc.resolversConfig);
                }
                return acc;
            }, getDefaultState());
        }
    };
};

module.exports = createExtension;
//# sourceMappingURL=extension.js.map
