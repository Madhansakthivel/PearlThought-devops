'use strict';

var graphqlScalars = require('graphql-scalars');
var nexus = require('nexus');
var time = require('./time.js');
require('./date.js');

var scalars = (()=>({
        JSON: nexus.asNexusMethod(graphqlScalars.GraphQLJSON, 'json'),
        DateTime: nexus.asNexusMethod(graphqlScalars.GraphQLDateTime, 'dateTime'),
        Time: nexus.asNexusMethod(time, 'time'),
        Date: nexus.asNexusMethod(graphqlScalars.GraphQLDate, 'date'),
        Long: nexus.asNexusMethod(graphqlScalars.GraphQLLong, 'long')
    }));

module.exports = scalars;
//# sourceMappingURL=index.js.map
