const LT_FIELD_NAME = 'lt';
var ltOperator = (()=>({
        fieldName: LT_FIELD_NAME,
        strapiOperator: '$lt',
        add (t, type) {
            t.field(LT_FIELD_NAME, {
                type
            });
        }
    }));

export { ltOperator as default };
//# sourceMappingURL=lt.mjs.map
