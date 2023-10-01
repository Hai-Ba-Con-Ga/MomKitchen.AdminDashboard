import { Kitchen } from "./kitchen";
import { Area } from "./area";
import { BaseEntity } from "../common/baseEntity";

export interface Location extends BaseEntity {
    lat: number;
    lng: number;
    kitchen: Kitchen | null;
    areaAsNorth: Area | null;
    areaAsSouth: Area | null;
    areaAsWest: Area | null;
    areaAsEast: Area | null;
}