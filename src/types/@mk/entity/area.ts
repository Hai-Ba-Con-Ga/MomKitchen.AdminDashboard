import { Location } from "./location";
import { Kitchen } from "./kitchen";
import { BaseEntity } from "../common/baseEntity";


export interface Area extends BaseEntity {
    name: string;
    northId: string;
    north: Location;
    southId: string;
    south: Location;
    eastId: string;
    east: Location;
    westId: string;
    west: Location;
    kitchens: Kitchen[];
}