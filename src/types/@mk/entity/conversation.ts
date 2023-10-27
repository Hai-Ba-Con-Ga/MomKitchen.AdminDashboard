import { Customer } from "./customer";
import { Kitchen } from "./kitchen";
import { BaseEntity } from "../common/baseEntity";

export interface Conversation extends BaseEntity {
    customer: Customer;
    kitchen: Kitchen;
    content: string;
}