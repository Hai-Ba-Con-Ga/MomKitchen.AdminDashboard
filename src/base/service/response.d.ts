import { HttpStatusCode } from "axios";

interface ResponseObject<T> {
    pageNumber : number,
    pageSize: number,
    totalCount
    data : T,
    message: string,
    statusCode : HttpStatusCode

}