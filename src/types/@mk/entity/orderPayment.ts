import { Order } from "./order";
import { PaymentType } from "./paymentType";
import { BaseEntity } from "../common/baseEntity";
import { PaymentStatus } from "../enum/paymentStatus";

export interface OrderPayment extends BaseEntity {
    status: PaymentStatus;
    amount: number;
    orderId: string;
    order: Order;
    paymentTypeId: string;
    paymentType: PaymentType;
}


export interface OrderPaymentAdmin extends OrderPayment{
    select?: boolean
}