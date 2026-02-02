'use strict';

const ENDS_WITH_FIELD_NAME = 'endsWith';
var endsWithOperator = (()=>({
        fieldName: ENDS_WITH_FIELD_NAME,
        strapiOperator: '$endsWith',
        add (t, type) {
            t.field(ENDS_WITH_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = endsWithOperator;
//# sourceMappingURL=ends-with.js.map
