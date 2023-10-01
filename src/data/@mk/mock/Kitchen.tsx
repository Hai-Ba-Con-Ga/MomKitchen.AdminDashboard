import { KitchenStatus } from "@/types/@mk/enum/kitchenStatus";
import { faker } from "@faker-js/faker";
import { generateRandomUser } from "./User";
import { generateRandomArea } from "./Area";
import { generateRandomLocation } from "./Location";
import { generateRandomDish } from "./Dish";
import { generateRandomTray } from "./Tray";
import { generateRandomMeal } from "./Meal";
import { Kitchen, KitchenAdmin } from "@/types/@mk/entity/kitchen";

export function generateRandomKitchen(): Kitchen {
    const location = generateRandomLocation();
    const owner =generateRandomUser();
    const area = generateRandomArea();
    return {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
      status: faker.datatype.number({ min: 0, max: 1 }) === 0
      ? KitchenStatus.ACTIVE
      : KitchenStatus.INACTIVE,
      locationId: location.id,
      location: location, // This will be populated when linking with a Location entity
      ownerId: owner.id,
      owner: owner,
      areaId: area.id,
      area: area,
      favoriteKitchens: [], // You can populate this array with FavouriteKitchen objects
      dishes: Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomDish()), // You can populate this array with Dish objects
      trays: Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomTray()), // You can populate this array with Tray objects
      meals: Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomMeal()), // You can populate this array with Meal objects
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
    };
  }
  export function generateRandomKitchenAdmin(): KitchenAdmin {
    const location = generateRandomLocation();
    const owner =generateRandomUser();
    const area = generateRandomArea();
    const dishes = Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomDish());
    const trays =  Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomTray());
    const meals = Array.from({ length: faker.number.int({min:1, max:10}) }, () => generateRandomMeal());
    return {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
      status: faker.datatype.number({ min: 0, max: 1 }) === 0
      ? KitchenStatus.ACTIVE
      : KitchenStatus.INACTIVE,
      locationId: location.id,
      location: location, // This will be populated when linking with a Location entity
      ownerId: owner.id,
      owner: owner,
      areaId: area.id,
      area: area,
      favoriteKitchens: [], // You can populate this array with FavouriteKitchen objects
      dishes, // You can populate this array with Dish objects
      trays, // You can populate this array with Tray objects
      meals , // You can populate this array with Meal objects
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
      noOfDish:dishes.length,
      noOfMeal: meals.length,
      noOfTray:  trays.length,
      rating:  faker.number.float({min:1, max:5,precision:1})
    };
  }
  
  // Generate a list of 20 mock kitchen objects
  export const mockKitchens = Array.from({ length: faker.number.int({min:20, max:50}) }, () => generateRandomKitchen());
  export const mockKitchenAdmin = Array.from({ length: faker.number.int({min:20, max:50}) }, () => generateRandomKitchenAdmin());
  
  
  
  
  