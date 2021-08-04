export interface Selected {
    district?: string,
    gp?: string,
    phase?: string,
    component?: string
}

export interface WardConfig {
    category: Selected,
    names: {
        wardNumber: number,
        wardName: string
    }[]
}