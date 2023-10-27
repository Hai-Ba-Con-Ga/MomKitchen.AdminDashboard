import { User } from "@/types/@mk/entity/user";
import { faker } from "@faker-js/faker";

export function generateRandomUser(): User {
    return {
      id: faker.datatype.bigInt().toString(),
      createdDate: faker.date.recent().toISOString(),
      updatedDate: faker.date.recent().toISOString(),
      createdBy: "admin",
      updatedBy: "admin",
      isDeleted: false,
      email: faker.internet.email(),
      credential: "customer",
      phone: faker.phone.number(),
      birthday: faker.date.past().toISOString(),
      avatarUrl: faker.image.avatar(),
      fullName: faker.name.fullName(),
      roleId: faker.datatype.uuid(),
      role: null,
      notifications: [],
      customer: null,
      kitchen: null,
    };
  }
  