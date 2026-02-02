const GT_FIELD_NAME = 'gt';
var gtOperator = (()=>({
        fieldName: GT_FIELD_NAME,
        strapiOperator: '$gt',
        add (t, type) {
            t.field(GT_FIELD_NAME, {
                type
            });
        }
    }));

export { gtOperator as default };
//# sourceMappingURL=gt.mjs.map
