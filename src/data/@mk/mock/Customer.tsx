import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { CustomerStatus } from "@/types/@mk/enum/customerStatus";
import { faker } from "@faker-js/faker";
import { generateRandomUser } from "./User";
// Define a function to generate a random user

// Define a function to generate a random customer
export function generateRandomCustomer(): CustomerAdmin {
  return {
    id: faker.datatype.number().toString(),
    createdDate: faker.date.recent().toISOString(),
    updatedDate: faker.date.recent().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
    isDeleted: false,
    userId: faker.datatype.uuid(),
    user: generateRandomUser(),
    status:
      faker.datatype.number({ min: 0, max: 1 }) === 0
        ? CustomerStatus.ACTIVE
        : CustomerStatus.INACTIVE, // You can customize the status
    favouriteKitchens: [],
    feedbacks: [],
    orders: [],
    order_quantity: faker.datatype.number({ min: 1, max: 10 }), // Adjust the range as needed
    spentMoney: faker.datatype.float({ min: 50, max: 1000, precision: 0.01 }), // Adjust the range as needed
    email: "",
    avatarUrl:"",
    fullName :"",
    phone: ""

    // selection: true,
  };
}

// Generate a list of 20 mock customer objects
export const mockCustomers = Array.from({ length: 20 }, () =>
  generateRandomCustomer()
);

// Print the list of mock customers

