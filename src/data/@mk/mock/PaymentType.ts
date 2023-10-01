import { PaymentType } from "@/types/@mk/entity/paymentType";
import { PaymentTypeStatus } from "@/types/@mk/enum/paymentTypeStatus";
import { faker } from "@faker-js/faker";

export function generateRandomPaymentType():PaymentType {
    return {
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
      provider: faker.company.name(),
      name: faker.finance.transactionType(),
      description: faker.lorem.sentence(),
      status: faker.datatype.boolean() ?PaymentTypeStatus.Active :PaymentTypeStatus.Inactive,
    };
  }

  export const mockPaymentTypes = Array.from({ length: 20 }, () => generateRandomPaymentType());