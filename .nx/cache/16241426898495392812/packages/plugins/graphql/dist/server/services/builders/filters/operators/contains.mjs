const CONTAINS_FIELD_NAME = 'contains';
var containsOperator = (()=>({
        fieldName: CONTAINS_FIELD_NAME,
        strapiOperator: '$contains',
        add (t, type) {
            t.field(CONTAINS_FIELD_NAME, {
                type
            });
        }
    }));

export { containsOperator as default };
//# sourceMappingURL=contains.mjs.map
