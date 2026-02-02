'use strict';

var fp = require('lodash/fp');
var and = require('./and.js');
var or = require('./or.js');
var not = require('./not.js');
var eq = require('./eq.js');
var eqi = require('./eqi.js');
var ne = require('./ne.js');
var nei = require('./nei.js');
var startsWith = require('./starts-with.js');
var endsWith = require('./ends-with.js');
var contains = require('./contains.js');
var notContains = require('./not-contains.js');
var containsi = require('./containsi.js');
var notContainsi = require('./not-containsi.js');
var gt = require('./gt.js');
var gte = require('./gte.js');
var lt = require('./lt.js');
var lte = require('./lte.js');
var _null = require('./null.js');
var notNull = require('./not-null.js');
var _in = require('./in.js');
var notIn = require('./not-in.js');
var between = require('./between.js');

const operators = {
    and: and,
    or: or,
    not: not,
    eq: eq,
    eqi: eqi,
    ne: ne,
    nei: nei,
    startsWith: startsWith,
    endsWith: endsWith,
    contains: contains,
    notContains: notContains,
    containsi: containsi,
    notContainsi: notContainsi,
    gt: gt,
    gte: gte,
    lt: lt,
    lte: lte,
    null: _null,
    notNull: notNull,
    in: _in,
    notIn: notIn,
    between: between
};
// Instantiate every operator with the Strapi instance
var operators$1 = (({ strapi })=>fp.mapValues((opCtor)=>opCtor({
            strapi
        }), operators));

module.exports = operators$1;
//# sourceMappingURL=index.js.map
