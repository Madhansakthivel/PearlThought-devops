'use strict';

const NOT_NULL_FIELD_NAME = 'notNull';
var notNullOperator = (()=>({
        fieldName: NOT_NULL_FIELD_NAME,
        strapiOperator: '$notNull',
        add (t) {
            t.boolean(NOT_NULL_FIELD_NAME);
        }
    }));

module.exports = notNullOperator;
//# sourceMappingURL=not-null.js.map
