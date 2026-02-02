import { GraphQLJSON, GraphQLDateTime, GraphQLDate, GraphQLLong } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';
import TimeScalar from './time.mjs';
import './date.mjs';

var scalars = (()=>({
        JSON: asNexusMethod(GraphQLJSON, 'json'),
        DateTime: asNexusMethod(GraphQLDateTime, 'dateTime'),
        Time: asNexusMethod(TimeScalar, 'time'),
        Date: asNexusMethod(GraphQLDate, 'date'),
        Long: asNexusMethod(GraphQLLong, 'long')
    }));

export { scalars as default };
//# sourceMappingURL=index.mjs.map
