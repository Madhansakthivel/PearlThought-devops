'use strict';

const NOT_CONTAINS_FIELD_NAME = 'notContains';
var notContainsOperator = (()=>({
        fieldName: NOT_CONTAINS_FIELD_NAME,
        strapiOperator: '$notContains',
        add (t, type) {
            t.field(NOT_CONTAINS_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = notContainsOperator;
//# sourceMappingURL=not-contains.js.map
