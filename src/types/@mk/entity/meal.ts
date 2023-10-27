import { Tray } from "./tray";
import { Kitchen } from "./kitchen";
import { Order } from "./order";
import { BaseEntity } from "../common/baseEntity";

export interface Meal extends BaseEntity {
    name: string;
    price: number;
    serviceFrom: string;
    serviceTo: string;
    serviceQuantity: number;
    trayId: string;
    tray?: Tray;
    kitchenId: string;
    kitchen?: Kitchen;
    trays?: Tray[];
    orders?: Order[];
}