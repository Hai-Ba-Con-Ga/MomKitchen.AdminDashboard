import { PaymentStatus } from "@/types/@mk/enum/paymentStatus";
import { faker } from "@faker-js/faker";
import { generateRandomPaymentType } from "./PaymentType";
import { generateRandomOrder } from "./Order";
import { OrderPaymentAdmin } from "@/types/@mk/entity/orderPayment";

export function generateRandomOrderPayment():OrderPaymentAdmin {
    const order = generateRandomOrder()
    return {
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
      status: Object.values(PaymentStatus)[faker.number.int({min:0, max: 2})] as PaymentStatus ,
      amount: faker.datatype.number({ min: 10, max: 200, precision: 0.01 }),
      orderId: order.id,
      order: order, // This will be populated when linking with an Order entity
      paymentTypeId: faker.number.int().toString(),
      paymentType: generateRandomPaymentType(),
    };
  }
  export const mockOrderPayments = Array.from({ length: 20 }, () => generateRandomOrderPayment());
