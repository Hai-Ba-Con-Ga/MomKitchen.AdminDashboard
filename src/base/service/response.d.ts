import { HttpStatusCode } from "axios";

interface ResponseObject<T> {
    data : T,
    message: string,
    statusCode : HttpStatusCode

}