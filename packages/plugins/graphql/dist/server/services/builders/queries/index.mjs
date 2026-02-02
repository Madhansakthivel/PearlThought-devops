import createCollectionTypeQueriesBuilder from './collection-type.mjs';
import createSingleTypeQueriesBuilder from './single-type.mjs';

var queries = ((context)=>({
        ...createCollectionTypeQueriesBuilder(context),
        ...createSingleTypeQueriesBuilder(context)
    }));

export { queries as default };
//# sourceMappingURL=index.mjs.map
