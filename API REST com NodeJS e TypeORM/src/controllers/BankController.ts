import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bankRepository } from "../repositories/bankRepository";
import { AccountRepository } from "../repositories/accountRepository";

export class BankController{
    async create(req: Request, res: Response){
        try{
            const { nameBank, typeUser } = req.body;
            
            const newBank = bankRepository.create({
                name_bank: nameBank,
                type_user:  typeUser // cliente, funcionário ou administração !!
            })

            if(!nameBank || !typeUser) return res.sendStatus(StatusCodes.BAD_REQUEST);
            if(typeUser !== 'cliente' && typeUser !== 'funcionário' && typeUser !== 'administração') return res.sendStatus(StatusCodes.BAD_REQUEST);
            if(typeof(nameBank) !== 'string' || typeof(typeUser) !== 'string') return res.sendStatus(StatusCodes.BAD_REQUEST);
            
            await bankRepository.save(newBank);

            console.log(newBank);

            return res.status(StatusCodes.CREATED).json(newBank);
        }
        catch(error){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }
}