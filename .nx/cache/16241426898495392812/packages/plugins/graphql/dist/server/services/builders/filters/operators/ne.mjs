const NE_FIELD_NAME = 'ne';
var neOperator = (()=>({
        fieldName: NE_FIELD_NAME,
        strapiOperator: '$ne',
        add (t, type) {
            t.field(NE_FIELD_NAME, {
                type
            });
        }
    }));

export { neOperator as default };
//# sourceMappingURL=ne.mjs.map
