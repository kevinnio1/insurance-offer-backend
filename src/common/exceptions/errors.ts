import { HttpStatus } from "@nestjs/common";
import { ErrorDetails } from "./service.exception";



export enum ErrorCodes {
    VALUE_CAR_TO_LOW = "VALUE_CAR_TO_LOW",
    DRIVER_TO_YOUNG = "DRIVER_TO_YOUNG",
    DRIVER_TO_YOUNG_FOR_PORSCHE = "DRIVER_TO_YOUNG_FOR_PORSCHE",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}


export const ServiceErrors: {
    [key in ErrorCodes]: ErrorDetails;
} = {
    [ErrorCodes.VALUE_CAR_TO_LOW]: {
        type: ErrorCodes.VALUE_CAR_TO_LOW,
        code: HttpStatus.BAD_REQUEST,
        message: "Sorry! The price of the car is too low."
    },
    [ErrorCodes.DRIVER_TO_YOUNG]: {
        type: ErrorCodes.DRIVER_TO_YOUNG,
        code: HttpStatus.BAD_REQUEST,
        message: "Sorry! The driver is too young"
    },
    [ErrorCodes.DRIVER_TO_YOUNG_FOR_PORSCHE]: {
        type: ErrorCodes.DRIVER_TO_YOUNG_FOR_PORSCHE,
        code: HttpStatus.BAD_REQUEST,
        message: "Sorry! We can not accept this particular risk"
    },
    [ErrorCodes.UNKNOWN_ERROR]: {
        type: ErrorCodes.UNKNOWN_ERROR,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An unknown error occured"
    }
}
