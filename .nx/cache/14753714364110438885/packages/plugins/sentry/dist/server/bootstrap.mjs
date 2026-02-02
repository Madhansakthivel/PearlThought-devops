import initSentryMiddleware from './middlewares/sentry.mjs';

var bootstrap = (async ({ strapi })=>{
    // Initialize the Sentry service exposed by this plugin
    initSentryMiddleware({
        strapi
    });
});

export { bootstrap as default };
//# sourceMappingURL=bootstrap.mjs.map
