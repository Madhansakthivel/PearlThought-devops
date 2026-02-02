'use strict';

const CONTAINS_FIELD_NAME = 'contains';
var containsOperator = (()=>({
        fieldName: CONTAINS_FIELD_NAME,
        strapiOperator: '$contains',
        add (t, type) {
            t.field(CONTAINS_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = containsOperator;
//# sourceMappingURL=contains.js.map
