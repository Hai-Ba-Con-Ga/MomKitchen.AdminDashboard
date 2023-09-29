import { Location } from "@/types/@mk/entity/location";
import { faker } from "@faker-js/faker";

export function generateRandomLocation():Location {
    return {
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
      kitchen: null, // This will be populated when linking with a Kitchen entity
      areaAsNorth: null, // This will be populated when linking with an Area entity
      areaAsSouth: null, // This will be populated when linking with an Area entity
      areaAsWest: null, // This will be populated when linking with an Area entity
      areaAsEast: null, // This will be populated when linking with an Area entity
    };
  }