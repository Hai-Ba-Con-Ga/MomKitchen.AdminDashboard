import { Tray } from "@/types/@mk/entity/tray";
import { faker } from "@faker-js/faker";

export function generateRandomTray():Tray {
    return {
      name: faker.lorem.words(2),
      description: faker.lorem.paragraph(),
      imgUrl: faker.image.urlLoremFlickr({category:"food"}),
      price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
      kitchenId: faker.number.int().toString(),
      kitchen: null, // This will be populated when linking with a Kitchen entity
      dishies: [], // You can populate this array with Dish objects
      meals: [], // You can populate this array with Meal objects
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
    };
  }
  
  // Generate a list of 20 mock tray objects
  export const mockTrays = Array.from({ length: faker.number.int({ min: 2, max: 5}) }, () => generateRandomTray()).map(tray => {
   return tray
  });
  
  
  
  
  
  