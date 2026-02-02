'use strict';

var fp = require('lodash/fp');
var utils = require('@strapi/utils');

const { PolicyError } = utils.errors;
const getPoliciesConfig = fp.propOr([], 'policies');
const createPoliciesMiddleware = (resolverConfig, { strapi })=>{
    const resolverPolicies = getPoliciesConfig(resolverConfig);
    const policies = strapi.get('policies').resolve(resolverPolicies, {});
    return async (resolve, parent, args, context, info)=>{
        // Create a graphql policy context
        const policyContext = createGraphQLPolicyContext(parent, args, context, info);
        // Run policies & throw an error if one of them fails
        for (const { handler, config } of policies){
            const result = await handler(policyContext, config, {
                strapi
            });
            if (![
                true,
                undefined
            ].includes(result)) {
                throw new PolicyError();
            }
        }
        return resolve(parent, args, context, info);
    };
};
const createGraphQLPolicyContext = (parent, args, context, info)=>{
    const policyContext = {
        get parent () {
            return parent;
        },
        get args () {
            return args;
        },
        get context () {
            return context;
        },
        get info () {
            return info;
        },
        get state () {
            return this.context.state;
        },
        get http () {
            return this.context.koaContext;
        }
    };
    return utils.policy.createPolicyContext('graphql', policyContext);
};

exports.createPoliciesMiddleware = createPoliciesMiddleware;
//# sourceMappingURL=policy.js.map
