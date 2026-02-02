import { list } from 'nexus';

const IN_FIELD_NAME = 'in';
var inOperator = (()=>({
        fieldName: IN_FIELD_NAME,
        strapiOperator: '$in',
        add (t, type) {
            t.field(IN_FIELD_NAME, {
                type: list(type)
            });
        }
    }));

export { inOperator as default };
//# sourceMappingURL=in.mjs.map
