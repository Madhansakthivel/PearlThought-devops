'use strict';

var fp = require('lodash/fp');

var attributes = (({ strapi })=>{
    /**
   * Check if the given attribute is a Strapi scalar
   * @param {object} attribute
   * @return {boolean}
   */ const isStrapiScalar = (attribute)=>{
        return strapi.plugin('graphql').service('constants').STRAPI_SCALARS.includes(attribute.type);
    };
    /**
   * Check if the given attribute is a GraphQL scalar
   * @param {object} attribute
   * @return {boolean}
   */ const isGraphQLScalar = (attribute)=>{
        return strapi.plugin('graphql').service('constants').GRAPHQL_SCALARS.includes(attribute.type);
    };
    /**
   * Check if the given attribute is a polymorphic relation
   * @param {object} attribute
   * @return {boolean}
   */ const isMorphRelation = (attribute)=>{
        return attribute.type === 'relation' && attribute.relation.includes('morph');
    };
    /**
   * Check if the given attribute is a media
   * @param {object} attribute
   * @return {boolean}
   */ const isMedia = fp.propEq('type', 'media');
    /**
   * Check if the given attribute is a relation
   * @param {object} attribute
   * @return {boolean}
   */ const isRelation = fp.propEq('type', 'relation');
    /**
   * Check if the given attribute is an enum
   * @param {object} attribute
   * @return {boolean}
   */ const isEnumeration = fp.propEq('type', 'enumeration');
    /**
   * Check if the given attribute is a component
   * @param {object} attribute
   * @return {boolean}
   */ const isComponent = fp.propEq('type', 'component');
    /**
   * Check if the given attribute is a dynamic zone
   * @param {object} attribute
   * @return {boolean}
   */ const isDynamicZone = fp.propEq('type', 'dynamiczone');
    return {
        isStrapiScalar,
        isGraphQLScalar,
        isMorphRelation,
        isMedia,
        isRelation,
        isEnumeration,
        isComponent,
        isDynamicZone
    };
});

module.exports = attributes;
//# sourceMappingURL=attributes.js.map
