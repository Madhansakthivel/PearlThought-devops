const ENDS_WITH_FIELD_NAME = 'endsWith';
var endsWithOperator = (()=>({
        fieldName: ENDS_WITH_FIELD_NAME,
        strapiOperator: '$endsWith',
        add (t, type) {
            t.field(ENDS_WITH_FIELD_NAME, {
                type
            });
        }
    }));

export { endsWithOperator as default };
//# sourceMappingURL=ends-with.mjs.map
