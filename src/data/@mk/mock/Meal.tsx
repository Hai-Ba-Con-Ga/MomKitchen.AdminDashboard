import { Meal } from "@/types/@mk/entity/meal";
import {faker} from "@faker-js/faker"
import { generateRandomTray } from "./Tray";
import { generateRandomKitchen } from "./Kitchen";
// Define a function to generate a random meal
export function generateRandomMeal(): Meal {
    const tray = generateRandomTray();
    // const kitchen = generateRandomKitchen();
    return {
      id: faker.number.int().toString()
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
      trayId: faker.number.int().toString()
      ,
      tray: tray, // This will be populated when linking with a Tray entity
      kitchenId: faker.number.int().toString()
      ,
      kitchen: null, // This will be populated when linking with a Kitchen entity
      trays: [], // You can populate this array with Tray objects
      orders: [], // You can populate this array with Order objects
    };
  }