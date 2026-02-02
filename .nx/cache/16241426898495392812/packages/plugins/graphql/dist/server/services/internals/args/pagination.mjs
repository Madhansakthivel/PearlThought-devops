import { inputObjectType, arg } from 'nexus';

const PaginationInputType = inputObjectType({
    name: 'PaginationArg',
    definition (t) {
        t.int('page');
        t.int('pageSize');
        t.int('start');
        t.int('limit');
    }
});
var PaginationArg = arg({
    type: PaginationInputType,
    default: {}
});

export { PaginationArg as default };
//# sourceMappingURL=pagination.mjs.map
