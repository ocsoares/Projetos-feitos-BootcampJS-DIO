import { AppDataSource } from "../data-source";
import { Bank } from "../database/src/entity/Bank";

export const bankRepository = AppDataSource.getRepository(Bank);