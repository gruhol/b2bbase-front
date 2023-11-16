export interface CategoryToCatalog {
    name: string,
    slug: string,
    children?: CategoryToCatalog[];
}