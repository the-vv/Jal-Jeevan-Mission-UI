import { Selected } from "./selected";

export interface User {
    _id?: string,
    username: string,
    password?: string,
    admin: boolean,
    district?: string,
    panchayath?: string,
}

export interface ContactDetails {
    _id?: string,
    isa?: ContactPeople[],
    ia?: ContactPeople[],
    gp?: ContactPeople[],
    user?: User | string,
    category?: Selected
}
 
export interface ContactPeople {
    name?: string,
    position?: string,
    number?: string,
    wardNumber?: string,
    wardName?: string
}