'use strict';

var index = require('./mappers/index.js');
var attributes = require('./attributes.js');
var naming = require('./naming.js');
var playground = require('./playground.js');

var utils = ((context)=>({
        playground: playground(),
        naming: naming(context),
        attributes: attributes(context),
        mappers: index(context)
    }));

module.exports = utils;
//# sourceMappingURL=index.js.map
