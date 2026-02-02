declare const address: {
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
type Address = typeof address;
export { address, Address };
