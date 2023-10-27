import { Kitchen } from "./kitchen";
import { Dish } from "./dish";
import { Meal } from "./meal";
import { BaseEntity } from "../common/baseEntity";

export interface Tray extends BaseEntity {
    name: string;
    description: string;
    imgUrl: string;
    price: number;
    kitchenId: string;
    kitchen?: Kitchen;
    dishies?: Dish[];
    dishes?: Dish[];
    meals?: Meal[];
}