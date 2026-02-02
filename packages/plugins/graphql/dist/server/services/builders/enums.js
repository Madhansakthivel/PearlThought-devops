'use strict';

var nexus = require('nexus');
var fp = require('lodash/fp');
var utils = require('@strapi/utils');

/**
 * Build a Nexus enum type from a Strapi enum attribute
 * @param {object} definition - The definition of the enum
 * @param {string[]} definition.enum - The params of the enum
 * @param {string} name - The name of the enum
 * @return {NexusEnumTypeDef}
 */ const buildEnumTypeDefinition = (definition, name)=>{
    return nexus.enumType({
        name,
        members: definition.enum.reduce((acc, value)=>fp.set(utils.strings.toRegressedEnumValue(value), value, acc), {})
    });
};
var enums = (()=>({
        buildEnumTypeDefinition
    }));

module.exports = enums;
//# sourceMappingURL=enums.js.map
