import { list } from 'nexus';

const AND_FIELD_NAME = 'and';
var andOperator = (()=>({
        fieldName: AND_FIELD_NAME,
        strapiOperator: '$and',
        add (t, type) {
            t.field(AND_FIELD_NAME, {
                type: list(type)
            });
        }
    }));

export { andOperator as default };
//# sourceMappingURL=and.mjs.map
