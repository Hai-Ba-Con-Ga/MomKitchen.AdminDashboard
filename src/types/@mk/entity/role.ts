import { User } from "./user";
import { BaseEntity } from "../common/baseEntity";

export interface Role extends BaseEntity {
    name: string;
    users?: User[];
}