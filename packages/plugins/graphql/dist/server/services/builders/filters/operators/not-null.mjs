const NOT_NULL_FIELD_NAME = 'notNull';
var notNullOperator = (()=>({
        fieldName: NOT_NULL_FIELD_NAME,
        strapiOperator: '$notNull',
        add (t) {
            t.boolean(NOT_NULL_FIELD_NAME);
        }
    }));

export { notNullOperator as default };
//# sourceMappingURL=not-null.mjs.map
