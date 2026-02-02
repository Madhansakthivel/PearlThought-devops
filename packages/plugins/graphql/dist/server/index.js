'use strict';

var index$1 = require('./config/index.js');
var bootstrap = require('./bootstrap.js');
var index$2 = require('./services/index.js');

var index = {
    config: index$1.config,
    bootstrap: bootstrap.bootstrap,
    services: index$2.services
};

module.exports = index;
//# sourceMappingURL=index.js.map
