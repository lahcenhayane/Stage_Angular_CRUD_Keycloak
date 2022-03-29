import { Author } from "./author.model";

export interface Movie {
    id?: any;
    title?: string;
    image?: string;
    description?: string;
    author?: Author;
}