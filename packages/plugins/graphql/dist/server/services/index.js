'use strict';

var index$1 = require('./content-api/index.js');
var typeRegistry = require('./type-registry.js');
var index$4 = require('./utils/index.js');
var constants = require('./constants.js');
var index$3 = require('./internals/index.js');
var index = require('./builders/index.js');
var extension = require('./extension/extension.js');
var index$2 = require('./format/index.js');

const services = {
    builders: index,
    'content-api': index$1,
    constants,
    extension,
    format: index$2,
    internals: index$3,
    'type-registry': typeRegistry,
    utils: index$4
};

exports.services = services;
//# sourceMappingURL=index.js.map
