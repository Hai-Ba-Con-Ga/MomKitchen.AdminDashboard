import { faker } from "@faker-js/faker";
import { generateRandomLocation } from "./Location";
import { Area } from "@/types/@mk/entity/area";

export function generateRandomArea(): Area {
    const northLocation = generateRandomLocation();
    const southLocation = generateRandomLocation();
    const eastLocation = generateRandomLocation();
    const westLocation = generateRandomLocation();
  
    return {
      name: faker.address.county(),
      northId: northLocation.id,
      north: northLocation,
      southId: southLocation.id,
      south: southLocation,
      eastId: eastLocation.id,
      east: eastLocation,
      westId: westLocation.id,
      west: westLocation,
      kitchens: [], // You can populate this array with Kitchen objects
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
    };
  }