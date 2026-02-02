'use strict';

const EQI_FIELD_NAME = 'eqi';
var eqiOperator = (()=>({
        fieldName: EQI_FIELD_NAME,
        strapiOperator: '$eqi',
        add (t, type) {
            t.field(EQI_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = eqiOperator;
//# sourceMappingURL=eqi.js.map
