'use strict';

var fp = require('lodash/fp');
var enums = require('./enums.js');
var dynamicZones = require('./dynamic-zones.js');
var entity = require('./entity.js');
var type = require('./type.js');
var response = require('./response.js');
var responseCollection = require('./response-collection.js');
var relationResponseCollection = require('./relation-response-collection.js');
var index$1 = require('./queries/index.js');
var index$2 = require('./mutations/index.js');
var index$3 = require('./filters/index.js');
var input = require('./input.js');
var genericMorph = require('./generic-morph.js');
var index$4 = require('./resolvers/index.js');
var index = require('./filters/operators/index.js');
var utils = require('./utils.js');

const buildersFactories = [
    enums,
    dynamicZones,
    entity,
    type,
    response,
    responseCollection,
    relationResponseCollection,
    index$1,
    index$2,
    index$3,
    input,
    genericMorph,
    index$4
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
            const builders = fp.pipe(// Create a new instance of every builders
            fp.map((factory)=>factory(context)), // Merge every builder into the same object
            fp.reduce(fp.merge, {})).call(null, buildersFactories);
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
            operators: index({
                strapi
            })
        },
        utils: utils({
            strapi
        })
    };
});

module.exports = builders;
//# sourceMappingURL=index.js.map
