declare const contentManager: ({
    id: number;
    action: string;
    subject: null;
    properties: {
        fields?: undefined;
    };
    conditions: never[];
} | {
    action: string;
    subject: string;
    properties: {
        fields: string[];
    };
    conditions: never[];
    id?: undefined;
} | {
    action: string;
    subject: string;
    id?: undefined;
    properties?: undefined;
    conditions?: undefined;
})[];
type ContentManager = typeof contentManager;
export { contentManager, ContentManager };
