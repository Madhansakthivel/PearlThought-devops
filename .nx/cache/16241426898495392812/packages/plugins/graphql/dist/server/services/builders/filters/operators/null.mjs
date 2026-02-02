const NULL_FIELD_NAME = 'null';
var nullOperator = (()=>({
        fieldName: NULL_FIELD_NAME,
        strapiOperator: '$null',
        add (t) {
            t.boolean(NULL_FIELD_NAME);
        }
    }));

export { nullOperator as default };
//# sourceMappingURL=null.mjs.map
