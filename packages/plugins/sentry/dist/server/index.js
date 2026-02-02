'use strict';

var bootstrap = require('./bootstrap.js');
var index$1 = require('./services/index.js');
var config = require('./config.js');

var index = (()=>({
        bootstrap,
        config,
        services: index$1
    }));

module.exports = index;
//# sourceMappingURL=index.js.map
