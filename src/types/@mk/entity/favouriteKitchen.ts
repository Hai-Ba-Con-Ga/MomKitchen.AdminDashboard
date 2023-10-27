import { Customer } from "./customer";
import { Kitchen } from "./kitchen";
import { BaseEntity } from "../common/baseEntity";

export interface FavouriteKitchen extends BaseEntity {
    customerId: string;
    customer: Customer;
    kitchenId: string;
    kitchen: Kitchen;
}