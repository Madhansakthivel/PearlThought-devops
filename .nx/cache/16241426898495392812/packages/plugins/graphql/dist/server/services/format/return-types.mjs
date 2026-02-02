var returnTypes = (()=>({
        toEntityResponse (value, info = {}) {
            const { args = {}, resourceUID } = info;
            return {
                value,
                info: {
                    args,
                    resourceUID
                }
            };
        },
        toEntityResponseCollection (nodes, info = {}) {
            const { args = {}, resourceUID } = info;
            return {
                nodes,
                info: {
                    args,
                    resourceUID
                }
            };
        }
    }));

export { returnTypes as default };
//# sourceMappingURL=return-types.mjs.map
