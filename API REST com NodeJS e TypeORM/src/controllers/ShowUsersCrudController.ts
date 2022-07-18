import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class ShowUsersCrudController{
    async create(req: Request, res: Response){
        res.status(StatusCodes.OK).send({message: 'Você está vendo todos os Usuários cadastrados !'});
    }
}

export default ShowUsersCrudController;