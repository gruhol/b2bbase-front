export interface CompanyToEditDto {
    name: string,
    type: string,
    legalForm: string,
    nip: string,
    regon: string,
    krs: string,
    email: string,
    phone: string,
    wwwSite: string,
    wwwStore: string
    ediCooperation: boolean,
    apiCooperation: boolean,
    productFileCooperation: boolean,
    description: string,
    logo: string,
    active: boolean;
}