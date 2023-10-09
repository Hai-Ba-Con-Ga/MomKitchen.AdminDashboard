import { User } from "./user";
import { FavouriteKitchen } from "./favouriteKitchen";
import { Feedback } from "./feedback";
import { Order } from "./order";
import { BaseEntity } from "../common/baseEntity";
import { CustomerStatus } from "../enum/customerStatus";

export interface Customer extends BaseEntity {
  userId?: string;
  user?: User;
  status: CustomerStatus;
  favouriteKitchens?: FavouriteKitchen[];
  feedbacks?: Feedback[];
  orders?: Order[];
}

export interface CustomerAdmin extends Customer {
  orderQuantity: number;
  spentMoney: number;
  // selection: boolean;
}
