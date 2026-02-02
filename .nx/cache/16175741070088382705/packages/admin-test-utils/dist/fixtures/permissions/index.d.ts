/**
 * TODO: These types could be done better, since they're mock data
 * for user-permissions plugin it might be better to extract them
 * from that package and use them here.
 */
import { admin, type Admin, app, type App } from './admin-permissions';
import { contentManager, type ContentManager } from './content-manager-permissions';
import { contentTypeBuilder, type ContentTypeBuilder } from './content-type-builder-permissions';
import { type Documentation } from './documentation-permissions';
declare const allPermissions: ({
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
} | {
    id: number;
    action: string;
    subject: null;
    properties: {};
    conditions: never[];
})[];
type AdminPermissions = typeof allPermissions;
export { admin, Admin, app, App, contentManager, ContentManager, contentTypeBuilder, ContentTypeBuilder, allPermissions, AdminPermissions, Documentation, };
