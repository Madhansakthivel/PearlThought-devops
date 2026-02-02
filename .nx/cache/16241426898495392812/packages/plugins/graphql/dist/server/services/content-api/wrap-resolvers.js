'use strict';

var fp = require('lodash/fp');
var graphql = require('graphql');
var utils = require('@strapi/utils');
var policy = require('./policy.js');

const { ForbiddenError } = utils.errors;
const introspectionQueries = [
    '__Schema',
    '__Type',
    '__Field',
    '__InputValue',
    '__EnumValue',
    '__Directive'
];
/**
 * Get & parse middlewares definitions from the resolver's config
 * @param {object} resolverConfig
 * @param {object} strapi
 * @return {function[]}
 */ const parseMiddlewares = (resolverConfig, strapi)=>{
    const resolverMiddlewares = fp.getOr([], 'middlewares', resolverConfig);
    // TODO: [v4] to factorize with compose endpoints (routes)
    return resolverMiddlewares.map((middleware)=>{
        if (fp.isFunction(middleware)) {
            return middleware;
        }
        if (typeof middleware === 'string') {
            return strapi.middleware(middleware);
        }
        if (typeof middleware === 'object') {
            const { name, options = {} } = middleware;
            return strapi.middleware(name)(options, {
                strapi
            });
        }
        throw new Error(`Invalid middleware type, expected (function,string,object), received ${typeof middleware}`);
    });
};
/**
 * Wrap the schema's resolvers if they've been
 * customized using the GraphQL extension service
 * @param {object} options
 * @param {GraphQLSchema} options.schema
 * @param {object} options.strapi
 * @param {object} options.extension
 * @return {GraphQLSchema}
 */ const wrapResolvers = ({ schema, strapi, extension = {} })=>{
    // Get all the registered resolvers configuration
    const { resolversConfig = {} } = extension;
    // Fields filters
    const isValidFieldName = (field)=>!field.startsWith('__');
    const typeMap = schema.getTypeMap();
    Object.entries(typeMap).forEach(([type, definition])=>{
        const isGraphQLObjectType = definition instanceof graphql.GraphQLObjectType;
        const isIgnoredType = introspectionQueries.includes(type);
        if (!isGraphQLObjectType || isIgnoredType) {
            return;
        }
        const fields = definition.getFields();
        const fieldsToProcess = Object.entries(fields).filter(([field])=>isValidFieldName(field));
        for (const [fieldName, fieldDefinition] of fieldsToProcess){
            const defaultResolver = fp.get(fieldName);
            const path = `${type}.${fieldName}`;
            const resolverConfig = fp.getOr({}, path, resolversConfig);
            const { resolve: baseResolver = defaultResolver } = fieldDefinition;
            // Parse & initialize the middlewares
            const middlewares = parseMiddlewares(resolverConfig, strapi);
            // Generate the policy middleware
            const policyMiddleware = policy.createPoliciesMiddleware(resolverConfig, {
                strapi
            });
            // Add the policyMiddleware at the end of the middlewares collection
            middlewares.push(policyMiddleware);
            // Bind every middleware to the next one
            const boundMiddlewares = middlewares.map((middleware, index, collection)=>{
                return (parents, args, context, info)=>middleware(// Make sure the last middleware in the list calls the baseResolver
                    index >= collection.length - 1 ? baseResolver : boundMiddlewares[index + 1], parents, args, context, info);
            });
            /**
       * GraphQL authorization flow
       * @param {object} context
       * @return {Promise<void>}
       */ const authorize = async ({ context })=>{
                const authConfig = fp.get('auth', resolverConfig);
                const authContext = fp.get('state.auth', context);
                const isValidType = [
                    'Mutation',
                    'Query',
                    'Subscription'
                ].includes(type);
                const hasConfig = !fp.isNil(authConfig);
                const isAuthDisabled = authConfig === false;
                if ((isValidType || hasConfig) && !isAuthDisabled) {
                    try {
                        await strapi.auth.verify(authContext, authConfig);
                    } catch (error) {
                        throw new ForbiddenError();
                    }
                }
            };
            /**
       * Base resolver wrapper that handles authorization, middlewares & policies
       * @return {Promise<any>}
       */ fieldDefinition.resolve = async (parent, args, context, info)=>{
                await authorize({
                    context
                });
                // Execute middlewares (including the policy middleware which will always be included)
                return fp.first(boundMiddlewares)(parent, args, context, info);
            };
        }
    });
    return schema;
};

exports.wrapResolvers = wrapResolvers;
//# sourceMappingURL=wrap-resolvers.js.map
