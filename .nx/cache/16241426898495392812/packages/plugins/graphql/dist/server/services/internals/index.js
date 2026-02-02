'use strict';

var index = require('./args/index.js');
var index$1 = require('./scalars/index.js');
var index$2 = require('./types/index.js');
var index$3 = require('./helpers/index.js');

var internals = ((context)=>({
        args: index(context),
        scalars: index$1(),
        buildInternalTypes: index$2(context),
        helpers: index$3(context)
    }));

module.exports = internals;
//# sourceMappingURL=index.js.map
