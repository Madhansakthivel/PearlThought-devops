declare const contentTypeBuilder: {
    id: number;
    action: string;
    subject: null;
    properties: {};
    conditions: never[];
}[];
type ContentTypeBuilder = typeof contentTypeBuilder;
export { contentTypeBuilder, ContentTypeBuilder };
