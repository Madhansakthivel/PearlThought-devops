'use strict';

const NE_FIELD_NAME = 'ne';
var neOperator = (()=>({
        fieldName: NE_FIELD_NAME,
        strapiOperator: '$ne',
        add (t, type) {
            t.field(NE_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = neOperator;
//# sourceMappingURL=ne.js.map
