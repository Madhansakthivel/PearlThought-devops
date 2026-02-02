'use strict';

var collectionType = require('./collection-type.js');
var singleType = require('./single-type.js');

var mutations = ((context)=>({
        ...collectionType(context),
        ...singleType(context)
    }));

module.exports = mutations;
//# sourceMappingURL=index.js.map
