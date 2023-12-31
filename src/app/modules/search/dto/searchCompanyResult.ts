import { CategoryCatalog } from "../../catalog/dto/CategoryCatalog";
import { CompanyCatalog } from "../../catalog/dto/CompanyCatalog";
import { Page } from "../../common/model/page";

export interface SearchCompanyResult {
    companies: Page<CompanyCatalog>,
    categoryListForCompany: CategoryCatalog[]
    voivodeshipEnumList: Map<string, string>
}