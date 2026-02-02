'use strict';

/**
 * Programmatic sentry middleware. We do not want to expose it in the plugin
 */ var initSentryMiddleware = (({ strapi })=>{
    const sentryService = strapi.plugin('sentry').service('sentry');
    sentryService.init();
    const sentry = sentryService.getInstance();
    if (!sentry) {
        // initialization failed
        return;
    }
    strapi.server.use(async (ctx, next)=>{
        try {
            await next();
        } catch (error) {
            if (error instanceof Error) {
                sentryService.sendError(error, (scope)=>{
                    scope.addEventProcessor((event)=>{
                        // Parse Koa context to add error metadata
                        return sentry.Handlers.parseRequest(event, ctx.request, {
                            // Don't parse the transaction name, we'll do it manually
                            transaction: false
                        });
                    });
                    // Manually add transaction name
                    scope.setTag('transaction', `${ctx.method} ${ctx._matchedRoute}`);
                    // Manually add Strapi version
                    scope.setTag('strapi_version', strapi.config.info.strapi);
                    scope.setTag('method', ctx.method);
                });
            }
            throw error;
        }
    });
});

module.exports = initSentryMiddleware;
//# sourceMappingURL=sentry.js.map
