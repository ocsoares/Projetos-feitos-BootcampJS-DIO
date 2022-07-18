    // Tem dois Patterns (Padrões) para Repository em TypeORM: Active Record e o Data Mapper !
    //  OBS: Vou usar o Data Mapper !!! <<<

import { AppDataSource } from "../data-source";
import { Account } from "../database/src/entity/Account";

                                                        // (Nome de uma Entidade !!)
export const AccountRepository = AppDataSource.getRepository(Account);