'use strict';

const NEI_FIELD_NAME = 'nei';
var neiOperator = (()=>({
        fieldName: NEI_FIELD_NAME,
        strapiOperator: '$nei',
        add (t, type) {
            t.field(NEI_FIELD_NAME, {
                type
            });
        }
    }));

module.exports = neiOperator;
//# sourceMappingURL=nei.js.map
