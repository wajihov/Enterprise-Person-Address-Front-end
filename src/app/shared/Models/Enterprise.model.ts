import { Address } from "./Address.model";
import { Person } from "./Person.model";

export interface Enterprise {
    id: number;
    name: string;
    tax_number: string;
    local_address: Address;
    persons: Person[];
}