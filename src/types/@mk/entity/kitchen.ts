import { Location } from "./location";
import { User } from "./user";
import { Area } from "./area";
import { FavouriteKitchen } from "./favouriteKitchen";
import { Dish } from "./dish";
import { Tray } from "./tray";
import { Meal } from "./meal";
import { BaseEntity } from "../common/baseEntity";
import { KitchenStatus } from "../enum/kitchenStatus";

export interface Kitchen extends BaseEntity {
    name: string;
    address: string;
    status: KitchenStatus;
    locationId: string;
    location?: Location;
    ownerId: string;
    owner?: User;
    areaId: string;
    area?: Area;
    favoriteKitchens?: FavouriteKitchen[];
    dishes?: Dish[];
    trays?: Tray[];
    meals?: Meal[];
}

export interface KitchenAdmin extends Kitchen {
    noOfDish : number;
    noOfMeal: number;
    noOfTray: number;
    rating: number;
}

export interface KitchenResponse {
    id? : string;
    no?: number;
    name?: string;
    address?: string;
    status?:  KitchenStatus,
    noOfDish : number;
    noOfMeal: number;
    noOfTray: number;
    rating: number;
    location: {
        id: string;
        lat: number;
        lng: number;
    },
    owner :{
        ownerId: string;
        ownerName: string;
        ownerAvatarUrl: string;
        ownerEmail: string;
    },
    area :{ 
        id : string;
        name: string;
    }
}

