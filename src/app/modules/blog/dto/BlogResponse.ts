import { BlogCategory } from "./BlogCategory";
import { UserResponse } from "./UserResponse";

export interface BlogResponse {
    title: string,
    category: BlogCategory,
    addDate: Date,
    editDate: Date,
    introduction: string,
    content: string,
    slug: string,
    author: UserResponse
}