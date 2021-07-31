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
    user?: User | string
}
 
export interface ContactPeople {
    name?: string,
    position?: string,
    number?: string
}