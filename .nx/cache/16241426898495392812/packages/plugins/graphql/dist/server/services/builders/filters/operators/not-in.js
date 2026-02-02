'use strict';

var nexus = require('nexus');

const NOT_IN_FIELD_NAME = 'notIn';
var notInOperator = (()=>({
        fieldName: NOT_IN_FIELD_NAME,
        strapiOperator: '$notIn',
        add (t, type) {
            t.field(NOT_IN_FIELD_NAME, {
                type: nexus.list(type)
            });
        }
    }));

module.exports = notInOperator;
//# sourceMappingURL=not-in.js.map
