const STARTS_WITH_FIELD_NAME = 'startsWith';
var startsWithOperator = (()=>({
        fieldName: STARTS_WITH_FIELD_NAME,
        strapiOperator: '$startsWith',
        add (t, type) {
            t.field(STARTS_WITH_FIELD_NAME, {
                type
            });
        }
    }));

export { startsWithOperator as default };
//# sourceMappingURL=starts-with.mjs.map
