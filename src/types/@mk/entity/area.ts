import { Location } from "./location";
import { Kitchen } from "./kitchen";
import { BaseEntity } from "../common/baseEntity";


export interface Area extends BaseEntity {
    name: string;
    boundaries?: Location[];
    kitchens?: Kitchen[];
}

export interface AreaAdmin extends Area {
    noOfKitchens: number;
   
}