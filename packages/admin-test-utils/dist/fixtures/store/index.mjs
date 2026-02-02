import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = {
    admin_app: jest.fn(()=>({
            permissions: {},
            status: 'init'
        }))
};
const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            // Disable timing checks for test env
            immutableCheck: false,
            serializableCheck: false
        })
});
var index = {
    store,
    state: store.getState()
};

export { index as default };
//# sourceMappingURL=index.mjs.map
