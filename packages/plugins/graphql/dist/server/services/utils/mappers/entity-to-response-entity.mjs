import { map } from 'lodash/fp';

const entityToResponseEntity = (entity)=>({
        id: entity.id,
        attributes: entity
    });
const entitiesToResponseEntities = map(entityToResponseEntity);
var entityToResponseEntity$1 = (()=>({
        entityToResponseEntity,
        entitiesToResponseEntities
    }));

export { entityToResponseEntity$1 as default };
//# sourceMappingURL=entity-to-response-entity.mjs.map
