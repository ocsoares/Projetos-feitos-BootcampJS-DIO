import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"

    // POR ALGUM MOTIVO, NÃO consegui usar o database-info.env !!! <<<< SÓ a Variável port !!! <<<
    
    // Também criei um Banco de Dados no pgAdmin com as MESMAS CONFIGURAÇÕES abaixo (NÃO SEI SE PRECISA ) !!

    // Corrigindo o erro de port - Tornando Number ou Undefined, igual port Aceita !!
const port = process.env.DB_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
        //Database LOCAL (Na MINHA Máquina !!) <
    type: 'postgres',
    host: 'localhost',
    port: port, // port: process.env.DB_PORT - Tava dando ERRO porque port Aceita NUMBER ou Undefined, e DB_PORT é String !!!
    username: 'postgres',
    password: 'Cadb016!',
    database: 'TypeORM_database',

    // Passando TODAS AS Entities do meu Projeto com esse Comando aí ! (__dirname = TUDO até a Pasta Raíz do Arquivo)
    entities: [`${__dirname}/**/entity/*.{ts,js}`], // /*.{ts,js} = Dentro da pasta, nesse caso, entity, Pega TODOS os Arquivos .ts e .js (.js quando for TRANSPILADO, óbvio !!) 
    migrations: [`${__dirname}/**/migration/*.{ts,js}`] // Mesmo coisa do de Cima para migrations, MAS mudando a Pasta
        // Informações do ElephantSQL !!
    // type: 'postgres',
    // host: 'motty.db.elephantsql.com',
    // port: port, // port: process.env.DB_PORT - Tava dando ERRO porque port Aceita NUMBER ou Undefined, e DB_PORT é String !!!
    // username: 'ylziwrko',
    // password: 'ceQYBtUBj25We6Zrg7VXdJK-cdntExnI',
    // database: 'ylziwrko',

});