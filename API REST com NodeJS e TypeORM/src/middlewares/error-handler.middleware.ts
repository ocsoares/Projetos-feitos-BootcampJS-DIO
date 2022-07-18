import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import failAuthenticatorError from "../models/failAuthenticator-error"

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof failAuthenticatorError){
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;