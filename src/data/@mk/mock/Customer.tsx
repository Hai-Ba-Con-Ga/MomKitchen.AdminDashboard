import CustomerList from "@/modules/customer/pages/list/list";
import { CustomerAdmin } from "@/types/@mk/entity/customer";
import { User } from "@/types/@mk/entity/user";
import { CustomerStatus } from "@/types/@mk/enum/customerStatus";
import { faker } from "@faker-js/faker";
// Define a function to generate a random user
function generateRandomUser(): User {
  return {
    id: faker.datatype.bigInt().toString(),
    createdDate: faker.date.recent().toISOString(),
    updatedDate: faker.date.recent().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
    isDeleted: false,
    email: faker.internet.email(),
    credential: "customer",
    phone: faker.phone.number(),
    birthday: faker.date.past().toISOString(),
    avatarUrl: faker.image.avatar(),
    fullName: faker.name.fullName(),
    roleId: faker.datatype.uuid(),
    role: null,
    notifications: [],
    customer: null,
    kitchen: null,
  };
}

// Define a function to generate a random customer
function generateRandomCustomer(): CustomerAdmin {
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
    selection: true,
  };
}

// Generate a list of 20 mock customer objects
export const mockCustomers = Array.from({ length: 20 }, () =>
  generateRandomCustomer()
);

// Print the list of mock customers

export const customer: CustomerAdmin[] = [
  {
    id: "1",
    createdDate: "2023-09-27T14:00:00Z",
    updatedDate: "2023-09-27T14:30:00Z",
    createdBy: "admin",
    updatedBy: "admin",
    isDeleted: false,
    userId: "1",
    user: {
      id: "1",
      createdDate: "2023-09-27T10:00:00Z",
      updatedDate: "2023-09-27T12:30:00Z",
      createdBy: null,
      updatedBy: "admin",
      isDeleted: false,
      email: "user1@example.com",
      password: "hashed_password_1",
      credential: "customer",
      phone: "+1234567890",
      birthday: "1990-05-15",
      avatarUrl: "https://example.com/avatar/user1.jpg",
      fullName: "John Doe",
      roleId: "2",
      role: null, // You can fill this in if needed
      notifications: [],
      customer: null, // This will be populated when linking with a customer entity
      kitchen: null, // This will be populated when linking with a kitchen entity
    }, // Link to the corresponding user
    status: CustomerStatus.ACTIVE, // Example customer status
    favouriteKitchens: [], // You can populate this array with FavouriteKitchen objects
    feedbacks: [], // You can populate this array with Feedback objects
    orders: [], // You can populate this array with Order objects
    order_quantity: 5,
    spentMoney: 500.0,
    selection: true,
  },
];
