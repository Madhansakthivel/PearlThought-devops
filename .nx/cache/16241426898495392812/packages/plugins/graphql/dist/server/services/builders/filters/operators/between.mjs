import { list } from 'nexus';

const BETWEEN_FIELD_NAME = 'between';
var betweenOperator = (()=>({
        fieldName: BETWEEN_FIELD_NAME,
        strapiOperator: '$between',
        add (t, type) {
            t.field(BETWEEN_FIELD_NAME, {
                type: list(type)
            });
        }
    }));

export { betweenOperator as default };
//# sourceMappingURL=between.mjs.map
