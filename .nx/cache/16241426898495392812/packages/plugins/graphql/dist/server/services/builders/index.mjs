import { pipe, map, reduce, merge } from 'lodash/fp';
import enums from './enums.mjs';
import dynamicZone from './dynamic-zones.mjs';
import entity from './entity.mjs';
import typeBuilder from './type.mjs';
import response from './response.mjs';
import responseCollection from './response-collection.mjs';
import relationResponseCollection from './relation-response-collection.mjs';
import queries from './queries/index.mjs';
import mutations from './mutations/index.mjs';
import filters from './filters/index.mjs';
import inputs from './input.mjs';
import genericMorph from './generic-morph.mjs';
import resolvers from './resolvers/index.mjs';
import operators from './filters/operators/index.mjs';
import utils from './utils.mjs';

const buildersFactories = [
    enums,
    dynamicZone,
    entity,
    typeBuilder,
    response,
    responseCollection,
    relationResponseCollection,
    queries,
    mutations,
    filters,
    inputs,
    genericMorph,
    resolvers
];
var builders = (({ strapi })=>{
    const buildersMap = new Map();
    return {
        /**
     * Instantiate every builder with a strapi instance & a type registry
     */ new (name, registry) {
            const context = {
                strapi,
                registry
            };
            const builders = pipe(// Create a new instance of every builders
            map((factory)=>factory(context)), // Merge every builder into the same object
            reduce(merge, {})).call(null, buildersFactories);
            buildersMap.set(name, builders);
            return builders;
        },
        /**
     * Delete a set of builders instances from
     * the builders map for a given name
     */ delete (name) {
            buildersMap.delete(name);
        },
        /**
     * Retrieve a set of builders instances from
     * the builders map for a given name
     */ get (name) {
            return buildersMap.get(name);
        },
        filters: {
            operators: operators({
                strapi
            })
        },
        utils: utils({
            strapi
        })
    };
});

export { builders as default };
//# sourceMappingURL=index.mjs.map
