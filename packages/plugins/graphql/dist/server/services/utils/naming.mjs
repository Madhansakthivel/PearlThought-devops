import { get, upperFirst, camelCase, pipe, lowerFirst } from 'lodash/fp';
import { singular } from 'pluralize';
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;
var naming = (({ strapi })=>{
    /**
   * Build a type name for a enum based on a content type & an attribute name
   */ const getEnumName = (contentType, attributeName)=>{
        const { attributes } = contentType;
        const { enumName } = attributes[attributeName];
        const { modelType } = contentType;
        const typeName = modelType === 'component' ? getComponentName(contentType) : getTypeName(contentType);
        const defaultEnumName = `ENUM_${typeName.toUpperCase()}_${attributeName.toUpperCase()}`;
        return enumName || defaultEnumName;
    };
    /**
   * Build the base type name for a given content type
   */ const getTypeName = (contentType, { plurality = 'singular' } = {})=>{
        const plugin = get('plugin', contentType);
        const modelName = get('modelName', contentType);
        const name = plurality === 'singular' ? get('info.singularName', contentType) : get('info.pluralName', contentType);
        const transformedPlugin = plugin ? upperFirst(camelCase(plugin)) : '';
        const transformedModelName = upperFirst(camelCase(name || singular(modelName)));
        return `${transformedPlugin}${transformedModelName}`;
    };
    /**
   * Build the entity's type name for a given content type
   */ const getEntityName = (contentType)=>{
        return `${getTypeName(contentType)}Entity`;
    };
    /**
   * Build the entity meta type name for a given content type
   */ const getEntityMetaName = (contentType)=>{
        return `${getEntityName(contentType)}Meta`;
    };
    /**
   * Build the entity response's type name for a given content type
   */ const getEntityResponseName = (contentType)=>{
        return `${getEntityName(contentType)}Response`;
    };
    /**
   * Build the entity response collection's type name for a given content type
   */ const getEntityResponseCollectionName = (contentType)=>{
        return `${getEntityName(contentType)}ResponseCollection`;
    };
    /**
   * Build the relation response collection's type name for a given content type
   */ const getRelationResponseCollectionName = (contentType)=>{
        return `${getTypeName(contentType)}RelationResponseCollection`;
    };
    /**
   * Build a component type name based on its definition
   */ const getComponentName = (contentType)=>{
        return contentType.globalId;
    };
    /**
   * Build a component type name based on a content type's attribute
   */ const getComponentNameFromAttribute = (attribute)=>{
        return strapi.components[attribute.component].globalId;
    };
    /**
   * Build a dynamic zone type name based on a content type and an attribute name
   */ const getDynamicZoneName = (contentType, attributeName)=>{
        const typeName = getTypeName(contentType);
        const dzName = upperFirst(camelCase(attributeName));
        const suffix = 'DynamicZone';
        return `${typeName}${dzName}${suffix}`;
    };
    /**
   * Build a dynamic zone input type name based on a content type and an attribute name
   */ const getDynamicZoneInputName = (contentType, attributeName)=>{
        const dzName = getDynamicZoneName(contentType, attributeName);
        return `${dzName}Input`;
    };
    /**
   * Build a component input type name based on a content type and an attribute name
   */ const getComponentInputName = (contentType)=>{
        const componentName = getComponentName(contentType);
        return `${componentName}Input`;
    };
    /**
   * Build a content type input name based on a content type and an attribute name
   */ const getContentTypeInputName = (contentType)=>{
        const typeName = getTypeName(contentType);
        return `${typeName}Input`;
    };
    /**
   * Build the queries type name for a given content type
   */ const getEntityQueriesTypeName = (contentType)=>{
        return `${getEntityName(contentType)}Queries`;
    };
    /**
   * Build the mutations type name for a given content type
   */ const getEntityMutationsTypeName = (contentType)=>{
        return `${getEntityName(contentType)}Mutations`;
    };
    /**
   * Build the filters type name for a given content type
   */ const getFiltersInputTypeName = (contentType)=>{
        const isComponent = contentType.modelType === 'component';
        const baseName = isComponent ? getComponentName(contentType) : getTypeName(contentType);
        return `${baseName}FiltersInput`;
    };
    /**
   * Build a filters type name for a given GraphQL scalar type
   */ const getScalarFilterInputTypeName = (scalarType)=>{
        return `${scalarType}FilterInput`;
    };
    /**
   * Build a type name for a given content type & polymorphic attribute
   */ const getMorphRelationTypeName = (contentType, attributeName)=>{
        const typeName = getTypeName(contentType);
        const formattedAttr = upperFirst(camelCase(attributeName));
        return `${typeName}${formattedAttr}Morph`;
    };
    /**
   * Build a custom type name generator with different customization options
   */ const buildCustomTypeNameGenerator = (options)=>{
        // todo[v4]: use singularName & pluralName is available
        const { prefix = '', suffix = '', plurality = 'singular', firstLetterCase = 'upper' } = options;
        if (![
            'plural',
            'singular'
        ].includes(plurality)) {
            throw new ApplicationError(`"plurality" param must be either "plural" or "singular", but got: "${plurality}"`);
        }
        const getCustomTypeName = pipe((ct)=>getTypeName(ct, {
                plurality
            }), firstLetterCase === 'upper' ? upperFirst : lowerFirst);
        return (contentType)=>`${prefix}${getCustomTypeName(contentType)}${suffix}`;
    };
    const getFindQueryName = buildCustomTypeNameGenerator({
        plurality: 'plural',
        firstLetterCase: 'lower'
    });
    const getFindConnectionQueryName = (contentType)=>{
        return `${getFindQueryName(contentType)}_connection`;
    };
    const getFindOneQueryName = buildCustomTypeNameGenerator({
        firstLetterCase: 'lower'
    });
    const getCreateMutationTypeName = buildCustomTypeNameGenerator({
        prefix: 'create',
        firstLetterCase: 'upper'
    });
    const getUpdateMutationTypeName = buildCustomTypeNameGenerator({
        prefix: 'update',
        firstLetterCase: 'upper'
    });
    const getDeleteMutationTypeName = buildCustomTypeNameGenerator({
        prefix: 'delete',
        firstLetterCase: 'upper'
    });
    return {
        getEnumName,
        getTypeName,
        getEntityName,
        getEntityMetaName,
        getEntityResponseName,
        getEntityResponseCollectionName,
        getRelationResponseCollectionName,
        getComponentName,
        getComponentNameFromAttribute,
        getDynamicZoneName,
        getDynamicZoneInputName,
        getComponentInputName,
        getContentTypeInputName,
        getEntityQueriesTypeName,
        getEntityMutationsTypeName,
        getFiltersInputTypeName,
        getScalarFilterInputTypeName,
        getMorphRelationTypeName,
        buildCustomTypeNameGenerator,
        getFindQueryName,
        getFindOneQueryName,
        getCreateMutationTypeName,
        getUpdateMutationTypeName,
        getDeleteMutationTypeName,
        getFindConnectionQueryName
    };
});

export { naming as default };
//# sourceMappingURL=naming.mjs.map
