'use strict';

var nexus = require('nexus');

const PaginationInputType = nexus.inputObjectType({
    name: 'PaginationArg',
    definition (t) {
        t.int('page');
        t.int('pageSize');
        t.int('start');
        t.int('limit');
    }
});
var PaginationArg = nexus.arg({
    type: PaginationInputType,
    default: {}
});

module.exports = PaginationArg;
//# sourceMappingURL=pagination.js.map
