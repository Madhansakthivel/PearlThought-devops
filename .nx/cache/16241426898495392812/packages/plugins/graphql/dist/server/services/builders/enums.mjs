import { enumType } from 'nexus';
import { set } from 'lodash/fp';
import { strings } from '@strapi/utils';

/**
 * Build a Nexus enum type from a Strapi enum attribute
 * @param {object} definition - The definition of the enum
 * @param {string[]} definition.enum - The params of the enum
 * @param {string} name - The name of the enum
 * @return {NexusEnumTypeDef}
 */ const buildEnumTypeDefinition = (definition, name)=>{
    return enumType({
        name,
        members: definition.enum.reduce((acc, value)=>set(strings.toRegressedEnumValue(value), value, acc), {})
    });
};
var enums = (()=>({
        buildEnumTypeDefinition
    }));

export { enums as default };
//# sourceMappingURL=enums.mjs.map
