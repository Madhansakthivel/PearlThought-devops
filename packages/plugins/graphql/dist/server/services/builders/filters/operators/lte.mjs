const LTE_FIELD_NAME = 'lte';
var lteOperator = (()=>({
        fieldName: LTE_FIELD_NAME,
        strapiOperator: '$lte',
        add (t, type) {
            t.field(LTE_FIELD_NAME, {
                type
            });
        }
    }));

export { lteOperator as default };
//# sourceMappingURL=lte.mjs.map
