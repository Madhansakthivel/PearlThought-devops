'use strict';

var fp = require('lodash/fp');

const entityToResponseEntity = (entity)=>({
        id: entity.id,
        attributes: entity
    });
const entitiesToResponseEntities = fp.map(entityToResponseEntity);
var entityToResponseEntity$1 = (()=>({
        entityToResponseEntity,
        entitiesToResponseEntities
    }));

module.exports = entityToResponseEntity$1;
//# sourceMappingURL=entity-to-response-entity.js.map
