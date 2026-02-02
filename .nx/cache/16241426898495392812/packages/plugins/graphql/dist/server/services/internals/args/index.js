'use strict';

var sort = require('./sort.js');
var publicationStatus = require('./publication-status.js');
var pagination = require('./pagination.js');

var args = ((context)=>({
        SortArg: sort,
        PaginationArg: pagination,
        PublicationStatusArg: publicationStatus(context)
    }));

module.exports = args;
//# sourceMappingURL=index.js.map
