import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bankRepository } from "../repositories/bankRepository";
import { AccountRepository } from "../repositories/accountRepository";

// O ID que vai colocar na URL se encontra no Banco de Dados !! <<

    // Fazer um Método de Saque que TIRA de uma Conta e ADICIONA em Outra!!
    // Tentar fazer um Banco de Dados de LOG's de transferência !! 

export class AccountController{
    async createAndAssociateAccountWithBank(req: Request, res: Response){
        try{
            const { person_name, person_password, cpf, balance } = req.body;
            const { idBank } = req.params // Parâmetros da Rota (informado na URL /:algo... ) !!!
    
                                                // findOneWhere já Implementa Diretamente o WHERE, então NÃO precisa do where: , se fosse apen-
                                                // - enas findOne Precisaria !!
            const createdAccount = await bankRepository.findOneBy({id: Number(idBank) }) // Como NÃO aceita string, usei Number no id !!
    
            if(!createdAccount) return res.status(StatusCodes.NOT_FOUND).json({message: 'Banco não encontrado !'});
    
            const associateAccount = AccountRepository.create({
                person_name, // TAMBÉM podia usar : , Mas como é o MESMO nome da Variável em req.body, NÃO precisa !!
                person_password,
                cpf,
                balance,
                bank: createdAccount // Associação com o Banco (informado pelo ID na URL) !!
            })     
    
            if(!person_name || !person_password || !cpf || !balance) return res.sendStatus(StatusCodes.BAD_REQUEST);
        if(typeof(person_name) !== 'string' || typeof(person_password) !== 'string' || typeof(cpf) !== 'number' || typeof(balance) !== 'number') return res.sendStatus(StatusCodes.BAD_REQUEST);
            
            await AccountRepository.save(associateAccount);
            console.log(associateAccount);
    
            return res.status(StatusCodes.CREATED).json(associateAccount);
        }
        catch(error){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async justCreateAnAccount(req: Request, res: Response){
        try{
            const { person_name, person_password, cpf, balance } = req.body

            if(!person_name || !person_password || !cpf || !balance) return res.sendStatus(StatusCodes.BAD_REQUEST);
            if(typeof(person_name) !== 'string' || typeof(person_password) !== 'string' || typeof(cpf) !== 'number' || typeof(balance) !== 'number'){
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }
    
            const newAccount = AccountRepository.create({
                person_name,
                person_password,
                cpf,
                balance
            })
    
            await AccountRepository.save(newAccount);
    
            console.log(newAccount);
    
            return res.status(StatusCodes.CREATED).json(newAccount);
        }
        catch(error){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async showAccounts(req: Request, res: Response){
        try{
            //const searchAccount = await AccountRepository.find() // Mostra SEM o Relacionamento com o Bank (nesse caso) !!

                // Mostrando os Usuários com RELACIONAMENTO com o Bank (nesse caso) !!
            const searchAccount = await AccountRepository.find({
                relations: {
                    bank: true
                }
            })

            return res.status(StatusCodes.OK).send(searchAccount);
        }
        catch(error){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAccount(req: Request, res: Response){
        try{    // Se eu quisesse poderia atualizar MAIS coisas da Conta...
            const { person_name, person_password } = req.body
            const { idAccount } = req.params

            const searchAccount = await AccountRepository.findOneBy({id: Number(idAccount)});

            if(!searchAccount) return res.status(StatusCodes.NOT_FOUND).json({message: 'Essa conta não existe !'});

            AccountRepository.update(idAccount, { // Id do que Quer atualizar !
                ...searchAccount, // {...(spread)Variável que RECEBE o Id = para Pegar TUDO o que tem Dentro do Objeto !! }
                
                person_name: person_name, // Propriedades a serem ATUALIZADAS/ALTERADAS !!
                person_password: person_password
            })

                // Por algum motivo ALTERA no Banco de Dados, MAS no Terminal aqui no VSCode só aparece Corretamente depois de Atualizar du-
                // -as vezes !!
            //console.log(searchAccount);
            //return res.status(StatusCodes.OK).json(searchAccount);

            return res.status(StatusCodes.OK).json({message: 'Conta atualizada !'});
        }
        catch(error){
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteAccount(req: Request, res: Response){
        const { idAccount } = req.params

        const searchAccount = await AccountRepository.findOneBy({id: Number(idAccount)});

        if(!searchAccount) return res.status(StatusCodes.NOT_FOUND).json({message: 'Essa conta não existe !'});

        AccountRepository.delete(idAccount);

        return res.status(StatusCodes.OK).json({message: 'Conta deletada com sucesso !'});
    }

    async rechargeAccount(req: Request, res: Response){
        const { balance } = req.body;
        const { idAccount } = req.params;

        if(balance === 0) return res.status(StatusCodes.BAD_REQUEST).json({message: 'Não é possível depositar 0 !'});
        if(balance < 0) return res.status(StatusCodes.BAD_REQUEST).json({message: 'Não é possível depositar um número negativo !'});
        if(!balance || typeof(balance) !== 'number') return res.sendStatus(StatusCodes.BAD_REQUEST);

        const searchAccount = await AccountRepository.findOneBy({id: Number(idAccount)});

        if(!searchAccount) return res.sendStatus(StatusCodes.NOT_FOUND);

        const searchBalance = await AccountRepository.find({
            select: ["balance"],
            where: {
                id: Number(idAccount)
            }
        })

            // Desestruturando e Somando o Balance da Conta ATUAL SOMADO ao Balance Depositado !!
        const [Account] = searchBalance
        const getBalance = Number(Account.balance);
        const newBalance = Number(balance) + getBalance;
        

        if(!searchAccount) return res.status(StatusCodes.NOT_FOUND).json({message: 'Conta não encontrada !'});

        await AccountRepository.update(idAccount, {
            ...searchAccount,
            balance: newBalance // Balance Antigo SOMADO ao Balance DEPOSITADO !!
        })

        return res.status(StatusCodes.CREATED).json({message: `${balance} foram depositados na sua conta com sucesso !`});
    }
}