
import { OrderPayment } from "./orderPayment";
import { BaseEntity } from "../common/baseEntity";
import { PaymentTypeStatus } from "../enum/paymentTypeStatus";

export interface PaymentType extends BaseEntity {
    provider: string;
    name: string;
    description: string;
    status: PaymentTypeStatus;
    orderPayments: OrderPayment[];
}