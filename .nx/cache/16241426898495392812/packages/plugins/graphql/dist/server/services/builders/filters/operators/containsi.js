'use strict';

const CONTAINSI_FIELD_NAME = 'containsi';
var containsiOperator = (()=>({
        fieldName: CONTAINSI_FIELD_NAME,
        strapiOperator: '$containsi',
        add (t, type) {
            t.field(CONTAINSI_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = containsiOperator;
//# sourceMappingURL=containsi.js.map
