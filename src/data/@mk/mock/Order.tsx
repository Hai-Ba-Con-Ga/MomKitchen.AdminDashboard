import { Order, OrderAdmin } from "@/types/@mk/entity/order";
import { faker } from "@faker-js/faker";
import { generateRandomCustomer } from "./Customer";
import { generateRandomMeal } from "./Meal";

  
  // Define a function to generate a random order
 export  function generateRandomOrder():Order {
    const customer = generateRandomCustomer()
    return {
      id: faker.number.int().toString()
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
      customerId: customer.id
      ,
      customer: customer, // This will be populated when linking with a Customer entity
      mealId: faker.number.int().toString()
      ,
      meal: generateRandomMeal(),
      feedback: null, // This will be populated when linking with a Feedback entity
      orderPayments: [], // You can populate this array with OrderPayment objects
    };
  }
 export function generateRandomOrderAdmin():OrderAdmin {
    const customer = generateRandomCustomer()
    return {
      id: faker.number.int({min:0,max: 1000}).toString()
      ,
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
      totalPrice: faker.datatype.number({ min: 10, max: 200, precision: 0.01 }),
      totalQuantity: faker.datatype.number({ min: 1, max: 10 }),
      surcharge: faker.datatype.number({ min: 1, max: 20, precision: 0.01 }),
      status: faker.number.int({min:100,max: 105}),
      customerId: customer.id
      ,
      customer: customer, // This will be populated when linking with a Customer entity
      mealId: faker.number.int().toString()
      ,
      meal: generateRandomMeal(),
      feedback: null, // This will be populated when linking with a Feedback entity
      orderPayments: [], // You can populate this array with OrderPayment objects
    };
  }
  
  
  // Generate a list of 20 mock order objects
  export const mockOrders = Array.from({ length: 20 }, () => generateRandomOrder());
  export function mockOrder():OrderAdmin[] {return Array.from({ length:faker.number.int({min:10,max: 50})  }, () => generateRandomOrderAdmin())}