'use strict';

var association = require('./association.js');
var query = require('./query.js');
var component = require('./component.js');
var dynamicZone = require('./dynamic-zone.js');
var pagination = require('./pagination.js');

var resolvers = ((context)=>({
        // Generics
        ...association(context),
        // Builders
        ...query(context),
        ...component(context),
        ...dynamicZone(context),
        ...pagination(context)
    }));

module.exports = resolvers;
//# sourceMappingURL=index.js.map
