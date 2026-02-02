const GTE_FIELD_NAME = 'gte';
var gteOperator = (()=>({
        fieldName: GTE_FIELD_NAME,
        strapiOperator: '$gte',
        add (t, type) {
            t.field(GTE_FIELD_NAME, {
                type
            });
        }
    }));

export { gteOperator as default };
//# sourceMappingURL=gte.mjs.map
