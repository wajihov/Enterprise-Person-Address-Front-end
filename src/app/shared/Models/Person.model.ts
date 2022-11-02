import { Address } from "./Address.model";
import { Post } from "./Post.model";

export interface Person {
    id: number;
    name: string;
    lastname: string;
    post: Post;
    local_address: Address;
    enterprise_id: number;
}