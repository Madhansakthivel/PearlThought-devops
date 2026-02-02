'use strict';

const GT_FIELD_NAME = 'gt';
var gtOperator = (()=>({
        fieldName: GT_FIELD_NAME,
        strapiOperator: '$gt',
        add (t, type) {
            t.field(GT_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = gtOperator;
//# sourceMappingURL=gt.js.map
