'use strict';

var nexus = require('nexus');
var utils = require('@strapi/utils');

const { isWritableAttribute } = utils.contentTypes;
var inputs = (({ strapi })=>{
    const { naming, mappers, attributes } = strapi.plugin('graphql').service('utils');
    const extension = strapi.plugin('graphql').service('extension');
    const { getComponentInputName, getContentTypeInputName, getEnumName, getDynamicZoneInputName } = naming;
    const { isStrapiScalar, isRelation, isMorphRelation, isMedia, isEnumeration, isComponent, isDynamicZone } = attributes;
    return {
        buildInputType (contentType) {
            const { attributes, modelType } = contentType;
            const name = (modelType === 'component' ? getComponentInputName : getContentTypeInputName).call(null, contentType);
            return nexus.inputObjectType({
                name,
                definition (t) {
                    const isFieldEnabled = (fieldName)=>{
                        return extension.shadowCRUD(contentType.uid).field(fieldName).hasInputEnabled();
                    };
                    const validAttributes = Object.entries(attributes)// Remove private attributes
                    .filter(([attributeName])=>!utils.contentTypes.isPrivateAttribute(contentType, attributeName))// Remove non-writable attributes
                    .filter(([attributeName])=>isWritableAttribute(contentType, attributeName))// Remove filters that have been disabled using the shadow CRUD extension API
                    .filter(([attributeName])=>isFieldEnabled(attributeName));
                    // Add the ID for the component to enable inplace updates
                    if (modelType === 'component' && isFieldEnabled('id')) {
                        t.id('id');
                    }
                    validAttributes.forEach(([attributeName, attribute])=>{
                        // Enums
                        if (isEnumeration(attribute)) {
                            const enumTypeName = getEnumName(contentType, attributeName);
                            t.field(attributeName, {
                                type: enumTypeName
                            });
                        } else if (isStrapiScalar(attribute)) {
                            const gqlScalar = mappers.strapiScalarToGraphQLScalar(attribute.type);
                            t.field(attributeName, {
                                type: gqlScalar
                            });
                        } else if (isMedia(attribute)) {
                            const isMultiple = attribute.multiple === true;
                            if (extension.shadowCRUD('plugin::upload.file').isDisabled()) {
                                return;
                            }
                            if (isMultiple) {
                                t.list.id(attributeName);
                            } else {
                                t.id(attributeName);
                            }
                        } else if (isRelation(attribute) && !isMorphRelation(attribute)) {
                            if (extension.shadowCRUD(attribute.target).isDisabled()) {
                                return;
                            }
                            const isToManyRelation = attribute.relation.endsWith('Many');
                            if (isToManyRelation) {
                                t.list.id(attributeName);
                            } else {
                                t.id(attributeName);
                            }
                        } else if (isComponent(attribute)) {
                            const isRepeatable = attribute.repeatable === true;
                            const component = strapi.components[attribute.component];
                            const componentInputType = getComponentInputName(component);
                            if (isRepeatable) {
                                t.list.field(attributeName, {
                                    type: componentInputType
                                });
                            } else {
                                t.field(attributeName, {
                                    type: componentInputType
                                });
                            }
                        } else if (isDynamicZone(attribute)) {
                            const dzInputName = getDynamicZoneInputName(contentType, attributeName);
                            t.list.field(attributeName, {
                                type: nexus.nonNull(dzInputName)
                            });
                        }
                    });
                }
            });
        }
    };
});

module.exports = inputs;
//# sourceMappingURL=input.js.map
