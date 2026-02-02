declare const admin: ({
    id: number;
    action: string;
    actionParameters: {
        from?: undefined;
    };
    subject: string;
    properties: {
        fields: string[];
        locales?: undefined;
    };
    conditions: never[];
} | {
    id: number;
    action: string;
    actionParameters: {
        from?: undefined;
    };
    subject: string;
    properties: {
        fields: string[];
        locales: string[];
    };
    conditions: never[];
} | {
    id: number;
    action: string;
    actionParameters: {
        from?: undefined;
    };
    subject: string;
    properties: {
        locales: string[];
        fields?: undefined;
    };
    conditions: never[];
} | {
    id: number;
    action: string;
    actionParameters: {
        from?: undefined;
    };
    subject: string;
    properties: {
        fields?: undefined;
        locales?: undefined;
    };
    conditions: never[];
} | {
    id: number;
    action: string;
    actionParameters: {
        from?: undefined;
    };
    subject: null;
    properties: {
        fields?: undefined;
        locales?: undefined;
    };
    conditions: never[];
} | {
    id: number;
    action: string;
    actionParameters: {
        from: number;
    };
    subject: null;
    properties: {
        fields?: undefined;
        locales?: undefined;
    };
    conditions: never[];
})[];
declare const app: {
    contentManager: {
        main: never[];
        collectionTypesConfigurations: {
            action: string;
            subject: null;
        }[];
        componentsConfigurations: {
            action: string;
            subject: null;
        }[];
        singleTypesConfigurations: {
            action: string;
            subject: null;
        }[];
    };
    marketplace: {
        main: {
            action: string;
            subject: null;
        }[];
        read: {
            action: string;
            subject: null;
        }[];
    };
    settings: {
        roles: {
            main: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        users: {
            main: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        webhooks: {
            main: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        'api-tokens': {
            main: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
            regenerate: {
                action: string;
                subject: null;
            }[];
        };
        'transfer-tokens': {
            main: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
            regenerate: {
                action: string;
                subject: null;
            }[];
        };
        'project-settings': {
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        auditLogs: {
            main: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        'review-workflows': {
            main: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            create: {
                action: string;
                subject: null;
            }[];
            delete: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
        sso: {
            main: {
                action: string;
                subject: null;
            }[];
            read: {
                action: string;
                subject: null;
            }[];
            update: {
                action: string;
                subject: null;
            }[];
        };
    };
};
type Admin = typeof admin;
type App = typeof app;
export { admin, Admin, app, App };
