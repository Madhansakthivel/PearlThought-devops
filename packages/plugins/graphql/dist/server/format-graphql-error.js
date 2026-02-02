'use strict';

var fp = require('lodash/fp');
var utils = require('@strapi/utils');
var errors = require('@apollo/server/errors');
var graphql = require('graphql');

const { HttpError, ForbiddenError, UnauthorizedError, ApplicationError, ValidationError } = utils.errors;
const formatToCode = (name)=>`STRAPI_${fp.toUpper(fp.snakeCase(name))}`;
const formatErrorToExtension = (error)=>({
        error: fp.pick([
            'name',
            'message',
            'details'
        ])(error)
    });
function createFormattedError(formattedError, message, code, originalError) {
    const options = {
        ...formattedError,
        extensions: {
            ...formattedError.extensions,
            ...formatErrorToExtension(originalError),
            code
        }
    };
    return new graphql.GraphQLError(message, options);
}
/**
 * The handler for Apollo Server v4's formatError config option
 *
 * Intercepts specific Strapi error types to send custom error response codes in the GraphQL response
 */ function formatGraphqlError(formattedError, error) {
    const originalError = errors.unwrapResolverError(error);
    // If this error doesn't have an associated originalError, it
    if (fp.isEmpty(originalError)) {
        return formattedError;
    }
    const { message = '', name = 'UNKNOWN' } = originalError;
    if (originalError instanceof ForbiddenError || originalError instanceof UnauthorizedError) {
        return createFormattedError(formattedError, message, 'FORBIDDEN', originalError);
    }
    if (originalError instanceof ValidationError) {
        return createFormattedError(formattedError, message, 'BAD_USER_INPUT', originalError);
    }
    if (originalError instanceof ApplicationError || originalError instanceof HttpError) {
        const errorName = formatToCode(name);
        return createFormattedError(formattedError, message, errorName, originalError);
    }
    if (originalError instanceof graphql.GraphQLError) {
        return formattedError;
    }
    // else if originalError doesn't appear to be from Strapi or GraphQL..
    // Log the error
    strapi.log.error(originalError);
    // Create a generic 500 to send so we don't risk leaking any data
    return createFormattedError(new graphql.GraphQLError('Internal Server Error'), 'Internal Server Error', 'INTERNAL_SERVER_ERROR', originalError);
}

exports.formatGraphqlError = formatGraphqlError;
//# sourceMappingURL=format-graphql-error.js.map
