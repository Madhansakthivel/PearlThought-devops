import { mapValues } from 'lodash/fp';
import andOperator from './and.mjs';
import orOperator from './or.mjs';
import notOperator from './not.mjs';
import eqOperator from './eq.mjs';
import eqiOperator from './eqi.mjs';
import neOperator from './ne.mjs';
import neiOperator from './nei.mjs';
import startsWithOperator from './starts-with.mjs';
import endsWithOperator from './ends-with.mjs';
import containsOperator from './contains.mjs';
import notContainsOperator from './not-contains.mjs';
import containsiOperator from './containsi.mjs';
import notContainsiOperator from './not-containsi.mjs';
import gtOperator from './gt.mjs';
import gteOperator from './gte.mjs';
import ltOperator from './lt.mjs';
import lteOperator from './lte.mjs';
import nullOperator from './null.mjs';
import notNullOperator from './not-null.mjs';
import inOperator from './in.mjs';
import notInOperator from './not-in.mjs';
import betweenOperator from './between.mjs';

const operators = {
    and: andOperator,
    or: orOperator,
    not: notOperator,
    eq: eqOperator,
    eqi: eqiOperator,
    ne: neOperator,
    nei: neiOperator,
    startsWith: startsWithOperator,
    endsWith: endsWithOperator,
    contains: containsOperator,
    notContains: notContainsOperator,
    containsi: containsiOperator,
    notContainsi: notContainsiOperator,
    gt: gtOperator,
    gte: gteOperator,
    lt: ltOperator,
    lte: lteOperator,
    null: nullOperator,
    notNull: notNullOperator,
    in: inOperator,
    notIn: notInOperator,
    between: betweenOperator
};
// Instantiate every operator with the Strapi instance
var operators$1 = (({ strapi })=>mapValues((opCtor)=>opCtor({
            strapi
        }), operators));

export { operators$1 as default };
//# sourceMappingURL=index.mjs.map
