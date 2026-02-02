import { entries, mapValues, omit } from 'lodash/fp';
import { nonNull, idArg } from 'nexus';
import { pagination } from '@strapi/utils';

const { withDefaultPagination } = pagination;
var utils = (({ strapi })=>{
    const { service: getService } = strapi.plugin('graphql');
    return {
        getContentTypeArgs (contentType, { multiple = true, isNested = false } = {}) {
            const { naming } = getService('utils');
            const { args } = getService('internals');
            const { modelType } = contentType;
            // Components
            if (modelType === 'component') {
                if (!multiple) return {};
                return {
                    filters: naming.getFiltersInputTypeName(contentType),
                    pagination: args.PaginationArg,
                    sort: args.SortArg
                };
            }
            const { kind } = contentType;
            // Collection Types
            if (kind === 'collectionType') {
                if (!multiple) {
                    return {
                        documentId: nonNull(idArg()),
                        status: args.PublicationStatusArg
                    };
                }
                const params = {
                    filters: naming.getFiltersInputTypeName(contentType),
                    pagination: args.PaginationArg,
                    sort: args.SortArg
                };
                if (!isNested) {
                    Object.assign(params, {
                        status: args.PublicationStatusArg
                    });
                }
                return params;
            }
            // Single Types
            if (kind === 'singleType') {
                const params = {};
                if (!isNested) {
                    Object.assign(params, {
                        status: args.PublicationStatusArg
                    });
                }
                return params;
            }
        },
        /**
     * Filter an object entries and keep only those whose value is a unique scalar attribute
     */ getUniqueScalarAttributes (attributes) {
            const { isStrapiScalar } = getService('utils').attributes;
            const uniqueAttributes = entries(attributes).filter(([, attribute])=>isStrapiScalar(attribute) && 'unique' in attribute && attribute.unique);
            return Object.fromEntries(uniqueAttributes);
        },
        /**
     * Map each value from an attribute to a FiltersInput type name
     * @param {object} attributes - The attributes object to transform
     * @return {Object<string, string>}
     */ scalarAttributesToFiltersMap (attributes) {
            return mapValues((attribute)=>{
                const { mappers, naming } = getService('utils');
                const gqlScalar = mappers.strapiScalarToGraphQLScalar(attribute.type);
                return naming.getScalarFilterInputTypeName(gqlScalar);
            }, attributes);
        },
        /**
     * Apply basic transform to GQL args
     */ transformArgs (args, { contentType, usePagination = false }) {
            const { mappers } = getService('utils');
            const { config } = strapi.plugin('graphql');
            const { pagination = {}, filters = {} } = args;
            // Init
            const newArgs = omit([
                'pagination',
                'filters'
            ], args);
            // Pagination
            if (usePagination) {
                const defaultLimit = config('defaultLimit');
                const maxLimit = config('maxLimit');
                Object.assign(newArgs, withDefaultPagination(pagination, {
                    maxLimit,
                    defaults: {
                        offset: {
                            limit: defaultLimit
                        },
                        page: {
                            pageSize: defaultLimit
                        }
                    }
                }));
            }
            // Filters
            if (args.filters) {
                Object.assign(newArgs, {
                    filters: mappers.graphQLFiltersToStrapiQuery(filters, contentType)
                });
            }
            return newArgs;
        }
    };
});

export { utils as default };
//# sourceMappingURL=utils.mjs.map
