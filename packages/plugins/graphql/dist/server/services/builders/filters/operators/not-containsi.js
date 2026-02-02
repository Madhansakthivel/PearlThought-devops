'use strict';

const NOT_CONTAINSI_FIELD_NAME = 'notContainsi';
var notContainsiOperator = (()=>({
        fieldName: NOT_CONTAINSI_FIELD_NAME,
        strapiOperator: '$notContainsi',
        add (t, type) {
            t.field(NOT_CONTAINSI_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = notContainsiOperator;
//# sourceMappingURL=not-containsi.js.map
