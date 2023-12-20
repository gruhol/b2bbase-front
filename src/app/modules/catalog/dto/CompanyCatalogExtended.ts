import { Branch } from "../../branch/model/branch";
import { CategoryToCatalog } from "./CategoryToCatalog";

export interface CompanyCatalogExtended {
    id: number,
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
    description: string,
    ediCooperation: boolean,
    apiCooperation: boolean,
    productFileCooperation: string,
    logo: string;
    branch: Branch | undefined;
    categories: Array<CategoryToCatalog>;
}