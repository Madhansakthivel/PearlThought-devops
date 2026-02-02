'use strict';

var toolkit = require('@reduxjs/toolkit');

const reducers = {
    admin_app: jest.fn(()=>({
            permissions: {},
            status: 'init'
        }))
};
const store = toolkit.configureStore({
    reducer: toolkit.combineReducers(reducers),
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

module.exports = index;
//# sourceMappingURL=index.js.map
