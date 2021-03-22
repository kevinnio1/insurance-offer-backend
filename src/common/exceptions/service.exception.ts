import { HttpStatus } from "@nestjs/common";

export interface ErrorDetails {
    code: HttpStatus;
    message: string;
    type: string;
}

export class ServiceException extends Error {
    public readonly context: object;
    public readonly code: HttpStatus;
    public readonly type: string;

    constructor(error: ErrorDetails, context?: object) {
        super(error.message);

        this.context = context;
        this.code = error.code;
        this.type = error.type;
        console.error({ error, context });
    }

}
