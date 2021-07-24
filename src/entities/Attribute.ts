export interface Attribute {
    name: string,
    id: number,
    default_name: string,
    editable: boolean
}

export interface MappingAttribute {
    name: string,
    type: 'TEXT' | 'SELECT' | 'CHECKBOX' | 'RADIO',
    data: {
        key: string,
        value: string
    }[]
}