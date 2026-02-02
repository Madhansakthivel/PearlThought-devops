'use strict';

var nexus = require('nexus');

const OR_FIELD_NAME = 'or';
var orOperator = (()=>({
        fieldName: OR_FIELD_NAME,
        strapiOperator: '$or',
        add (t, type) {
            t.field(OR_FIELD_NAME, {
                type: nexus.list(type)
            });
        }
    }));

module.exports = orOperator;
//# sourceMappingURL=or.js.map
