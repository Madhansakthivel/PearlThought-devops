import { list } from 'nexus';

const OR_FIELD_NAME = 'or';
var orOperator = (()=>({
        fieldName: OR_FIELD_NAME,
        strapiOperator: '$or',
        add (t, type) {
            t.field(OR_FIELD_NAME, {
                type: list(type)
            });
        }
    }));

export { orOperator as default };
//# sourceMappingURL=or.mjs.map
