'use strict';

var collectionType = require('./collection-type.js');
var singleType = require('./single-type.js');

var queries = ((context)=>({
        ...collectionType(context),
        ...singleType(context)
    }));

module.exports = queries;
//# sourceMappingURL=index.js.map
