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

export interface TargetDate {
    applicationName: string,
    path: string,    
    section: string,
    date: Date| number | string,
    category: Selected
}

export interface ApplicationFile {
    fieldName?: string,
    name?: string,
    url?: string,
    fid?: string,
    size?: number
}