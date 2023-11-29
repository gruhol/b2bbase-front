export interface CategoryCatalog {
    id: number,
    name: string,
    slug: string,
    children?: CategoryCatalog[],
    parent: CategoryCatalog;
}