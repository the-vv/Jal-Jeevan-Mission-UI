import { Selected } from "./selected";

export interface Application {
    _id?: string
    name?: string,
    values?: any,
    files?: ApplicationFile[],
    category?: Selected,
    datetime?: Date,
    targetDate?: Date,
    submitted?: boolean
}

export interface ApplicationFile {
    fieldName?: string,
    name?: string,
    url?: string,
    fid?: string,
    size?: number
}