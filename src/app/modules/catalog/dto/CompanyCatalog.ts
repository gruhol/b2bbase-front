import { Branch } from "../../branch/model/branch";

export interface CompanyCatalog {
    name: string,
    slug: string,
    type: string,
    legalForm: string,
    nip: string,
    regon: string,
    krs: string,
    email: string,
    phone: string,
    wwwSite: string,
    wwwStore: string,
    ediCooperation: boolean,
    apiCooperation: boolean,
    productFileCooperation: string,
    logo: string;
    branch: Branch | undefined;
}