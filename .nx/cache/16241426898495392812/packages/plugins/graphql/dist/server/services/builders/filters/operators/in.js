'use strict';

var nexus = require('nexus');

const IN_FIELD_NAME = 'in';
var inOperator = (()=>({
        fieldName: IN_FIELD_NAME,
        strapiOperator: '$in',
        add (t, type) {
            t.field(IN_FIELD_NAME, {
                type: nexus.list(type)
            });
        }
    }));

module.exports = inOperator;
//# sourceMappingURL=in.js.map
