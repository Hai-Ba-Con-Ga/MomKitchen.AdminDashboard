import { Dish } from "@/types/@mk/entity/dish";
import { DishStatus } from "@/types/@mk/enum/dishStatus";
import { faker } from "@faker-js/faker";


// Define a function to generate a random dish
export function generateRandomDish():Dish {
  return {
    id: faker.number.int().toString(),
    createdDate: faker.date.recent().toISOString(),
    updatedDate: faker.date.recent().toISOString(),
    createdBy: null,
    updatedBy: 'admin',
    isDeleted: false,
    name: faker.lorem.words(2),
    imageUrl: faker.image.food(),
    description: faker.lorem.paragraph(),
    status:   faker.datatype.number({ min: 0, max: 1 }) === 0
    ? DishStatus.Active
    : DishStatus.Inactive,
    kitchenId: faker.number.int().toString(),
    kitchen: null, // This will be populated when linking with a Kitchen entity
    trays: [], // You can populate this array with Tray objects
  };
}

// Generate a list of 20 mock dish objects
export const mockDishes =Array.from({ length: faker.number.int({ min: 2, max: 5}) }, () => generateRandomDish()) ;


