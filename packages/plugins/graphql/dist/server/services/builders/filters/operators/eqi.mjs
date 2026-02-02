const EQI_FIELD_NAME = 'eqi';
var eqiOperator = (()=>({
        fieldName: EQI_FIELD_NAME,
        strapiOperator: '$eqi',
        add (t, type) {
            t.field(EQI_FIELD_NAME, {
                type
            });
        }
    }));

export { eqiOperator as default };
//# sourceMappingURL=eqi.mjs.map
