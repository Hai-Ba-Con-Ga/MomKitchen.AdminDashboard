export type FilterString = `${FilterObject["field"]}:${FilterObject["op"]}:${FilterObject["value"]}`

export enum FilterOps {
    EQUAL = "eq",
    NOT_EQUAL = "neq",
    LESS_THAN = "lt",
    LESS_THAN_EQUAL = "lte",
    GREATER_THAN = "gt",
    GREATER_THAN_EQUAL = "gte",
    CONTAINS = "contains"
}
export type FilterObject =  {
    field : string;
    op : FilterOps;
    value : string | number | boolean
}
export type FilterState = {
    [x:FilterObject["field"]] : FilterObject
};