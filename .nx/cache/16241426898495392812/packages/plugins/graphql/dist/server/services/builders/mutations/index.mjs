import createCollectionTypeMutationsBuilder from './collection-type.mjs';
import createSingleTypeMutationsBuilder from './single-type.mjs';

var mutations = ((context)=>({
        ...createCollectionTypeMutationsBuilder(context),
        ...createSingleTypeMutationsBuilder(context)
    }));

export { mutations as default };
//# sourceMappingURL=index.mjs.map
