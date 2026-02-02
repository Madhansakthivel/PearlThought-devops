'use strict';

var nexus = require('nexus');

const BETWEEN_FIELD_NAME = 'between';
var betweenOperator = (()=>({
        fieldName: BETWEEN_FIELD_NAME,
        strapiOperator: '$between',
        add (t, type) {
            t.field(BETWEEN_FIELD_NAME, {
                type: nexus.list(type)
            });
        }
    }));

module.exports = betweenOperator;
//# sourceMappingURL=between.js.map
