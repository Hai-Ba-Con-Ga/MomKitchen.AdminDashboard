import { OrderStatus } from "@/types/@mk/enum/orderStatus";
import {faker} from "@faker-js/faker"
// Define a function to generate a random meal
function generateRandomMeal() {
    return {
      id: faker.number.int()
      ,
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
      name: faker.lorem.words(2),
      price: faker.datatype.number({ min: 5, max: 50, precision: 0.01 }),
      serviceFrom: faker.date.future().toISOString(),
      serviceTo: faker.date.future().toISOString(),
      serviceQuantity: faker.datatype.number({ min: 1, max: 10 }),
      trayId: faker.number.int()
      ,
      tray: null, // This will be populated when linking with a Tray entity
      kitchenId: faker.number.int()
      ,
      kitchen: null, // This will be populated when linking with a Kitchen entity
      trays: [], // You can populate this array with Tray objects
      orders: [], // You can populate this array with Order objects
    };
  }
  
  // Define a function to generate a random order
  function generateRandomOrder() {
    return {
      id: faker.number.int()
      ,
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
      totalPrice: faker.datatype.number({ min: 10, max: 200, precision: 0.01 }),
      totalQuantity: faker.datatype.number({ min: 1, max: 10 }),
      surcharge: faker.datatype.number({ min: 1, max: 20, precision: 0.01 }),
      status: faker.number.int({min:0,max: 1}),
      customerId: faker.number.int()
      ,
      customer: null, // This will be populated when linking with a Customer entity
      mealId: faker.number.int()
      ,
      meal: generateRandomMeal(),
      feedback: null, // This will be populated when linking with a Feedback entity
      orderPayments: [], // You can populate this array with OrderPayment objects
    };
  }
  
  // Generate a list of 20 mock order objects
  const mockOrders = Array.from({ length: 20 }, () => generateRandomOrder());
  