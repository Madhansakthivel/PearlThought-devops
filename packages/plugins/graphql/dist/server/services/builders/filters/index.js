'use strict';

var contentType = require('./content-type.js');

var filters = ((context)=>({
        ...contentType(context)
    }));

module.exports = filters;
//# sourceMappingURL=index.js.map
