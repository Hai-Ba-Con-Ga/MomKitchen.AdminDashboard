
import { Customer } from "./customer";
import { Meal } from "./meal";
import { Feedback } from "./feedback";
import { OrderPayment } from "./orderPayment";
import { BaseEntity } from "../common/baseEntity";
import { OrderStatus } from "../enum/orderStatus";

export interface Order extends BaseEntity {
    totalPrice: number;
    totalQuantity: number;
    surcharge: number;
    status: OrderStatus;
    customerId: string;
    customer: Customer;
    mealId: string;
    meal: Meal;
    feedback: Feedback | null;
    orderPayments: OrderPayment[];
}