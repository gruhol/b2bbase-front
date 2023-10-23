export interface CategoryResponse {
    id: number,
    name: string,
    children: CategoryResponse[],
    selected: boolean,
    parent: CategoryResponse;
}