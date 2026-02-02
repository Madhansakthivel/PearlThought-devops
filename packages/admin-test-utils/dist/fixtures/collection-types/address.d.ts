declare const address: {
    uid: string;
    settings: {
        bulkable: boolean;
        filterable: boolean;
        searchable: boolean;
        pageSize: number;
        mainField: string;
        defaultSortBy: string;
        defaultSortOrder: string;
    };
    metadatas: {
        id: {
            edit: {};
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        postal_coder: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        categories: {
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField: {
                    name: string;
                    schema: {
                        type: string;
                    };
                };
            };
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
                mainField: {
                    name: string;
                    schema: {
                        type: string;
                    };
                };
            };
        };
        cover: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        images: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        city: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        likes: {
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField: {
                    name: string;
                    schema: {
                        type: string;
                    };
                };
            };
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
                mainField: {
                    name: string;
                    schema: {
                        type: string;
                    };
                };
            };
        };
        json: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        slug: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        notrepeat_req: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        repeat_req: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        repeat_req_min: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        createdAt: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
        updatedAt: {
            edit: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
            list: {
                label: string;
                searchable: boolean;
                sortable: boolean;
            };
        };
    };
    layouts: {
        list: ({
            key: string;
            name: string;
            fieldSchema: {
                type: string;
                pluginOptions?: undefined;
                collection?: undefined;
                via?: undefined;
                dominant?: undefined;
                attribute?: undefined;
                column?: undefined;
                isVirtual?: undefined;
                targetModel?: undefined;
                relationType?: undefined;
                multiple?: undefined;
                required?: undefined;
                allowedTypes?: undefined;
            };
            metadatas: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField?: undefined;
            };
            queryInfos?: undefined;
        } | {
            key: string;
            name: string;
            fieldSchema: {
                type: string;
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                collection?: undefined;
                via?: undefined;
                dominant?: undefined;
                attribute?: undefined;
                column?: undefined;
                isVirtual?: undefined;
                targetModel?: undefined;
                relationType?: undefined;
                multiple?: undefined;
                required?: undefined;
                allowedTypes?: undefined;
            };
            metadatas: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField?: undefined;
            };
            queryInfos?: undefined;
        } | {
            key: string;
            name: string;
            fieldSchema: {
                collection: string;
                via: string;
                dominant: boolean;
                attribute: string;
                column: string;
                isVirtual: boolean;
                type: string;
                targetModel: string;
                relationType: string;
                pluginOptions?: undefined;
                multiple?: undefined;
                required?: undefined;
                allowedTypes?: undefined;
            };
            metadatas: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField: {
                    name: string;
                    schema: {
                        type: string;
                    };
                };
            };
            queryInfos: {
                endPoint: string;
                defaultParams: {};
            };
        } | {
            key: string;
            name: string;
            fieldSchema: {
                type: string;
                multiple: boolean;
                required: boolean;
                allowedTypes: string[];
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                collection?: undefined;
                via?: undefined;
                dominant?: undefined;
                attribute?: undefined;
                column?: undefined;
                isVirtual?: undefined;
                targetModel?: undefined;
                relationType?: undefined;
            };
            metadatas: {
                label: string;
                searchable: boolean;
                sortable: boolean;
                mainField?: undefined;
            };
            queryInfos?: undefined;
        })[];
        edit: (({
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                multiple?: undefined;
                required?: undefined;
                allowedTypes?: undefined;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        } | {
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                multiple: boolean;
                required: boolean;
                allowedTypes: string[];
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        })[] | ({
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                multiple: boolean;
                required: boolean;
                allowedTypes: string[];
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                maxLength?: undefined;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        } | {
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                required: boolean;
                maxLength: number;
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                multiple?: undefined;
                allowedTypes?: undefined;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        })[] | {
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                targetField: string;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        }[] | {
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                repeatable: boolean;
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                component: string;
                required: boolean;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        }[] | {
            name: string;
            size: number;
            fieldSchema: {
                type: string;
                repeatable: boolean;
                pluginOptions: {
                    i18n: {
                        localized: boolean;
                    };
                };
                component: string;
                required: boolean;
                min: number;
            };
            metadatas: {
                label: string;
                description: string;
                placeholder: string;
                visible: boolean;
                editable: boolean;
            };
        }[])[];
    };
    isDisplayed: boolean;
    apiID: string;
    kind: string;
    info: {
        displayName: string;
        name: string;
        description: string;
        label: string;
    };
    options: {
        increments: boolean;
        timestamps: string[];
        comment: string;
    };
    pluginOptions: {
        i18n: {
            localized: boolean;
        };
    };
    attributes: {
        id: {
            type: string;
        };
        postal_coder: {
            type: string;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
        };
        categories: {
            collection: string;
            via: string;
            dominant: boolean;
            attribute: string;
            column: string;
            isVirtual: boolean;
            type: string;
            targetModel: string;
            relationType: string;
        };
        cover: {
            type: string;
            multiple: boolean;
            required: boolean;
            allowedTypes: string[];
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
        };
        images: {
            type: string;
            multiple: boolean;
            required: boolean;
            allowedTypes: string[];
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
        };
        city: {
            type: string;
            required: boolean;
            maxLength: number;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
        };
        likes: {
            collection: string;
            via: string;
            isVirtual: boolean;
            type: string;
            targetModel: string;
            relationType: string;
        };
        json: {
            type: string;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
        };
        slug: {
            type: string;
            targetField: string;
        };
        notrepeat_req: {
            type: string;
            repeatable: boolean;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
            component: string;
            required: boolean;
        };
        repeat_req: {
            type: string;
            repeatable: boolean;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
            component: string;
            required: boolean;
        };
        repeat_req_min: {
            type: string;
            repeatable: boolean;
            pluginOptions: {
                i18n: {
                    localized: boolean;
                };
            };
            component: string;
            required: boolean;
            min: number;
        };
        createdAt: {
            type: string;
        };
        updatedAt: {
            type: string;
        };
    };
};
type Address = typeof address;
export { address, Address };
