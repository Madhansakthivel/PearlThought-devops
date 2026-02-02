'use strict';

var nexus = require('nexus');

const AND_FIELD_NAME = 'and';
var andOperator = (()=>({
        fieldName: AND_FIELD_NAME,
        strapiOperator: '$and',
        add (t, type) {
            t.field(AND_FIELD_NAME, {
                type: nexus.list(type)
            });
        }
    }));

module.exports = andOperator;
//# sourceMappingURL=and.js.map
