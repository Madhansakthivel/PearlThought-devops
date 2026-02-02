'use strict';

var sentry = require('./middlewares/sentry.js');

var bootstrap = (async ({ strapi })=>{
    // Initialize the Sentry service exposed by this plugin
    sentry({
        strapi
    });
});

module.exports = bootstrap;
//# sourceMappingURL=bootstrap.js.map
