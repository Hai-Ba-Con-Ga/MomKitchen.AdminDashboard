import { Role } from "@/types/@mk/entity/role";
import { faker } from "@faker-js/faker";

const roles = ["admin", "kitchen", "customer"]
export function generateRandomRole():Role {
    return {
      name: roles[faker.number.int({min:0, max: 2})] ,
      id: faker.number.int().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: null,
      updatedBy: 'admin',
      isDeleted: false,
    };
  }
  
  // Generate a list of 20 mock tray objects
  export const mockRole = Array.from({ length: faker.number.int({ min: 2, max: 3}) }, () => generateRandomRole()).map(role => {
   return role
  });
  
  
  
  
  
  