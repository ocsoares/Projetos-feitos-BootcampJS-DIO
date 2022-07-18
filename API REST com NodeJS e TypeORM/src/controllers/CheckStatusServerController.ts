import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class CheckStatusServerController{
    async create(req: Request, res: Response){
        res.status(StatusCodes.OK).send({message: 'Servidor online !'});
    }
}

export default CheckStatusServerController

    // Explicação sobre o Export com new :
// Export com new exporta já Instanciando e torna a Classe FIXA,  NÃO podendo ter seus Dados independentes em cada aplicação.
// Exportar com default e dar new DEPOIS na Aplicação torna a classe FLEXÍVEL, Permitindo ter seus próprios Dados !

    // Ex:
// export default new CheckStatusServerController(); - Exportando e já Instanciando !
// No import iria ficar algo assim: CheckStatusServerController.Método da classe (SEM () ) !!!