import { faker } from "@faker-js/faker";
import { generateRandomCustomer } from "./Customer";
import { generateRandomOrder } from "./Order";

// Define a function to generate a random feedback
export function generateRandomFeedback() {
    const customer = generateRandomCustomer()
    const order = generateRandomOrder();
    return {
      content: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 5, precision: 1 }), // Assuming a 5-star rating system
      customerId: customer.id,
      customer: customer, // This will be populated when linking with a Customer entity
      orderId: order.id,
      order: order, // This will be populated when linking with an Order entity
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
    };
  }
  
  // Generate a list of 20 mock feedback objects
  export const mockFeedbacks = Array.from({ length: 20 }, () => generateRandomFeedback());
  