import { list } from 'nexus';

const NOT_IN_FIELD_NAME = 'notIn';
var notInOperator = (()=>({
        fieldName: NOT_IN_FIELD_NAME,
        strapiOperator: '$notIn',
        add (t, type) {
            t.field(NOT_IN_FIELD_NAME, {
                type: list(type)
            });
        }
    }));

export { notInOperator as default };
//# sourceMappingURL=not-in.mjs.map
