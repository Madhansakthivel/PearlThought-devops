import SortArg from './sort.mjs';
import publicationStatus from './publication-status.mjs';
import PaginationArg from './pagination.mjs';

var args = ((context)=>({
        SortArg,
        PaginationArg,
        PublicationStatusArg: publicationStatus(context)
    }));

export { args as default };
//# sourceMappingURL=index.mjs.map
