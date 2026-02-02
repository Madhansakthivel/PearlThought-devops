'use strict';

var utils = require('@graphql-tools/utils');
var nexus = require('nexus');
var fp = require('lodash/fp');
var wrapResolvers = require('./wrap-resolvers.js');
var collectionType = require('./register-functions/collection-type.js');
var singleType = require('./register-functions/single-type.js');
var component = require('./register-functions/component.js');
var polymorphic = require('./register-functions/polymorphic.js');
var scalars = require('./register-functions/scalars.js');
var internals = require('./register-functions/internals.js');
var dynamicZones = require('./register-functions/dynamic-zones.js');
var enums = require('./register-functions/enums.js');
var inputs = require('./register-functions/inputs.js');
var filters = require('./register-functions/filters.js');

var contentAPI = (({ strapi })=>{
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { mergeSchemas, addResolversToSchema } = require('@graphql-tools/schema');
    const { service: getGraphQLService } = strapi.plugin('graphql');
    const { config } = strapi.plugin('graphql');
    const { KINDS, GENERIC_MORPH_TYPENAME } = getGraphQLService('constants');
    const extensionService = getGraphQLService('extension');
    // Type Registry
    let registry;
    // Builders Instances
    let builders;
    // Cached set of built-in query fields (populated at bootstrap)
    let builtInQueryFields = new Set();
    const buildSchema = ()=>{
        const isShadowCRUDEnabled = !!config('shadowCRUD');
        // Create a new empty type registry
        registry = getGraphQLService('type-registry').new();
        // Reset the builders instances associated to the
        // content-api, and link the new type registry
        builders = getGraphQLService('builders').new('content-api', registry);
        scalars.registerScalars({
            registry,
            strapi
        });
        internals.registerInternals({
            registry,
            strapi
        });
        if (isShadowCRUDEnabled) {
            shadowCRUD();
        }
        // Build a merged schema from both Nexus types & SDL type definitions
        const schema = buildMergedSchema({
            registry
        });
        // Generate the extension configuration for the content API.
        // This extension instance needs to be generated after the Nexus schema's
        // generation, so that configurations created during types definitions
        // can be registered before being used in the wrap resolvers operation
        const extension = extensionService.generate({
            typeRegistry: registry
        });
        // Add the extension's resolvers to the final schema
        const schemaWithResolvers = addResolversToSchema({
            schema,
            resolvers: extension.resolvers
        });
        // Create a configuration object for the artifacts generation
        const outputs = {
            schema: config('artifacts.schema', false),
            typegen: config('artifacts.typegen', false)
        };
        const currentEnv = strapi.config.get('environment');
        const nexusSchema = nexus.makeSchema({
            types: [],
            // Build the schema from the merged GraphQL schema.
            // Since we're passing the schema to the mergeSchema property, it'll transform our SDL type definitions
            // into Nexus type definition, thus allowing them to be handled by  Nexus plugins & other processing
            mergeSchema: {
                schema: schemaWithResolvers
            },
            // Apply user-defined plugins
            plugins: extension.plugins,
            // Whether to generate artifacts (GraphQL schema, TS types definitions) or not.
            // By default, we generate artifacts only on development environment
            shouldGenerateArtifacts: config('generateArtifacts', currentEnv === 'development'),
            // Artifacts generation configuration
            outputs
        });
        // Wrap resolvers if needed (auth, middlewares, policies...) as configured in the extension
        const wrappedNexusSchema = wrapResolvers.wrapResolvers({
            schema: nexusSchema,
            strapi,
            extension
        });
        // Prune schema, remove unused types
        // eg: removes registered subscriptions if they're disabled in the config)
        const prunedNexusSchema = utils.pruneSchema(wrappedNexusSchema);
        // Populate builtInQueryFields set for use by resolvers to avoid runtime schema builds
        try {
            const queryType = prunedNexusSchema.getQueryType();
            const fields = queryType ? Object.keys(queryType.getFields() || {}) : [];
            builtInQueryFields = new Set(fields);
        } catch (e) {
        // ignore; leave set empty
        }
        return prunedNexusSchema;
    };
    const getBuiltInQueryFields = ()=>builtInQueryFields;
    const isBuiltInQueryField = (fieldName)=>builtInQueryFields.has(fieldName) || fieldName.endsWith('_connection');
    const buildMergedSchema = ({ registry })=>{
        // Here we extract types, plugins & typeDefs from a temporary generated
        // extension since there won't be any addition allowed after schemas generation
        const { types, typeDefs = [] } = extensionService.generate({
            typeRegistry: registry
        });
        // Nexus schema built with user-defined & shadow CRUD auto generated Nexus types
        const nexusSchema = nexus.makeSchema({
            types: [
                registry.definitions,
                types
            ]
        });
        // Merge type definitions with the Nexus schema
        return mergeSchemas({
            typeDefs,
            // Give access to the shadowCRUD & nexus based types
            // Note: This is necessary so that types defined in SDL can reference types defined with Nexus
            schemas: [
                nexusSchema
            ]
        });
    };
    const shadowCRUD = ()=>{
        const extensionService = getGraphQLService('extension');
        // Get every content type & component defined in Strapi
        const contentTypes = [
            ...Object.values(strapi.components),
            ...Object.values(strapi.contentTypes)
        ];
        // Disable Shadow CRUD for admin content types
        contentTypes.map(fp.prop('uid')).filter(fp.startsWith('admin::')).forEach((uid)=>extensionService.shadowCRUD(uid).disable());
        const contentTypesWithShadowCRUD = contentTypes.filter((ct)=>extensionService.shadowCRUD(ct.uid).isEnabled());
        // Generate and register definitions for every content type
        registerAPITypes(contentTypesWithShadowCRUD);
        // Generate and register polymorphic types' definitions
        registerMorphTypes(contentTypesWithShadowCRUD);
    };
    /**
   * Register needed GraphQL types for every content type
   * @param {object[]} contentTypes
   */ const registerAPITypes = (contentTypes)=>{
        for (const contentType of contentTypes){
            const { modelType } = contentType;
            const registerOptions = {
                registry,
                strapi,
                builders
            };
            // Generate various types associated to the content type
            // (enums, dynamic-zones, filters, inputs...)
            enums.registerEnumsDefinition(contentType, registerOptions);
            dynamicZones.registerDynamicZonesDefinition(contentType, registerOptions);
            filters.registerFiltersDefinition(contentType, registerOptions);
            inputs.registerInputsDefinition(contentType, registerOptions);
            // Generate & register component's definition
            if (modelType === 'component') {
                component.registerComponent(contentType, registerOptions);
                continue;
            }
            const { kind } = contentType;
            // Generate & register single type's definition
            if (kind === 'singleType') {
                singleType.registerSingleType(contentType, registerOptions);
            } else if (kind === 'collectionType') {
                collectionType.registerCollectionType(contentType, registerOptions);
            }
        }
    };
    const registerMorphTypes = (contentTypes)=>{
        // Create & register a union type that includes every type or component registered
        const genericMorphType = builders.buildGenericMorphDefinition();
        registry.register(GENERIC_MORPH_TYPENAME, genericMorphType, {
            kind: KINDS.morph
        });
        for (const contentType of contentTypes){
            polymorphic.registerPolymorphicContentType(contentType, {
                registry,
                strapi
            });
        }
    };
    return {
        buildSchema,
        getBuiltInQueryFields,
        isBuiltInQueryField
    };
});

module.exports = contentAPI;
//# sourceMappingURL=index.js.map
