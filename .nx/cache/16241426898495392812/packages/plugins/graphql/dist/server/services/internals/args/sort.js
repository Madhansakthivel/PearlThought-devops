'use strict';

var nexus = require('nexus');

const SortArg = nexus.arg({
    type: nexus.list('String'),
    default: []
});

module.exports = SortArg;
//# sourceMappingURL=sort.js.map
