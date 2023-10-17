export interface CategoryResponse {
    id: number,
    name: string,
    children: Array<CategoryResponse>;
}