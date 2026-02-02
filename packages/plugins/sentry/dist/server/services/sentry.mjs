import * as Sentry from '@sentry/node';

const createSentryService = (strapi)=>{
    let isReady = false;
    let instance = null;
    // Retrieve user config and merge it with the default one
    const config = strapi.config.get('plugin::sentry');
    return {
        /**
     * Initialize Sentry service
     */ init () {
            // Make sure there isn't a Sentry instance already running
            if (instance != null) {
                return this;
            }
            // Don't init Sentry if no DSN was provided
            if (!config.dsn) {
                strapi.log.info('@strapi/plugin-sentry is disabled because no Sentry DSN was provided');
                return this;
            }
            try {
                Sentry.init({
                    dsn: config.dsn,
                    environment: strapi.config.get('environment'),
                    ...config.init
                });
                // Store the successfully initialized Sentry instance
                instance = Sentry;
                isReady = true;
            } catch (error) {
                strapi.log.warn('Could not set up Sentry, make sure you entered a valid DSN');
            }
            return this;
        },
        /**
     * Expose Sentry instance through a getter
     */ getInstance () {
            return instance;
        },
        /**
     * Higher level method to send exception events to Sentry
     */ sendError (error, configureScope) {
            // Make sure Sentry is ready
            if (!isReady || !instance) {
                strapi.log.warn("Sentry wasn't properly initialized, cannot send event");
                return;
            }
            instance.withScope((scope)=>{
                // Configure the Sentry scope using the provided callback
                if (configureScope && config.sendMetadata) {
                    configureScope(scope);
                }
                // Actually send the Error to Sentry
                instance?.captureException(error);
            });
        }
    };
};
var sentry = (({ strapi })=>createSentryService(strapi));

export { sentry as default };
//# sourceMappingURL=sentry.mjs.map
