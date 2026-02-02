'use strict';

var graphql = require('graphql');
var utils = require('@strapi/utils');

const { ValidationError } = utils.errors;
/**
 * A GraphQL scalar used to store Time (HH:mm:ss.SSS) values
 * @type {GraphQLScalarType}
 */ const TimeScalar = new graphql.GraphQLScalarType({
    name: 'Time',
    description: 'A time string with format HH:mm:ss.SSS',
    serialize (value) {
        return utils.parseType({
            type: 'time',
            value
        });
    },
    parseValue (value) {
        return utils.parseType({
            type: 'time',
            value
        });
    },
    parseLiteral (ast) {
        if (ast.kind !== graphql.Kind.STRING) {
            throw new ValidationError('Time cannot represent non string type');
        }
        const { value } = ast;
        return utils.parseType({
            type: 'time',
            value
        });
    }
});

module.exports = TimeScalar;
//# sourceMappingURL=time.js.map
