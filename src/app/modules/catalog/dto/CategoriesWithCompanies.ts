import { Page } from "../../common/model/page";
import { CategoryExtended } from "./CategoryExtended";
import { CompanyCatalog } from "./CompanyCatalog";

export interface CategoriesWithCompanies {
    categoryExtended: CategoryExtended,
    listCompany: Page<CompanyCatalog>
}