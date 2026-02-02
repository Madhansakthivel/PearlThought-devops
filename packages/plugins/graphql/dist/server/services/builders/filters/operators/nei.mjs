const NEI_FIELD_NAME = 'nei';
var neiOperator = (()=>({
        fieldName: NEI_FIELD_NAME,
        strapiOperator: '$nei',
        add (t, type) {
            t.field(NEI_FIELD_NAME, {
                type
            });
        }
    }));

export { neiOperator as default };
//# sourceMappingURL=nei.mjs.map
