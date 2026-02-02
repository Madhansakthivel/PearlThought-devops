'use strict';

const NULL_FIELD_NAME = 'null';
var nullOperator = (()=>({
        fieldName: NULL_FIELD_NAME,
        strapiOperator: '$null',
        add (t) {
            t.boolean(NULL_FIELD_NAME);
        }
    }));

module.exports = nullOperator;
//# sourceMappingURL=null.js.map
