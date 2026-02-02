const CONTAINSI_FIELD_NAME = 'containsi';
var containsiOperator = (()=>({
        fieldName: CONTAINSI_FIELD_NAME,
        strapiOperator: '$containsi',
        add (t, type) {
            t.field(CONTAINSI_FIELD_NAME, {
                type
            });
        }
    }));

export { containsiOperator as default };
//# sourceMappingURL=containsi.mjs.map
