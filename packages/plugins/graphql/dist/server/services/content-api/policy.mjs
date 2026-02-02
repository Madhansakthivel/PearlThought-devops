import { propOr } from 'lodash/fp';
import { policy, errors } from '@strapi/utils';

const { PolicyError } = errors;
const getPoliciesConfig = propOr([], 'policies');
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
    return policy.createPolicyContext('graphql', policyContext);
};

export { createPoliciesMiddleware };
//# sourceMappingURL=policy.mjs.map
