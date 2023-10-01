import { Customer } from "./customer";
import { Order } from "./order";
import { BaseEntity } from "../common/baseEntity";

export interface Feedback extends BaseEntity {
    content: string;
    rating: number;
    customerId: string;
    customer: Customer;
    orderId: string;
    order: Order;
}