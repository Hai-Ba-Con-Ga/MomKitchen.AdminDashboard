
import { Kitchen } from "./kitchen";
import { Tray } from "./tray";
import { BaseEntity } from "../common/baseEntity";
import { DishStatus } from "../enum/dishStatus";

export interface Dish extends BaseEntity {
    name: string;
    imageUrl: string;
    description: string | null;
    status: DishStatus;
    kitchenId: string;
    kitchen: Kitchen;
    trays: Tray[];
}