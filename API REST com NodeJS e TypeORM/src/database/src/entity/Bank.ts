import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

    // Entidade = Pelo o que eu entendi, é uma TABELA no Banco de Dados ! 
    // Cria uma Entidade('nome da entidade')  
    //  OBS: Se NÃO colocar Algum nome para a Entidade, ele vai colocar Automaticamente o nome da Classe !!
@Entity('banks')
export class Bank{
        
    // Transforma o Campo ID em uma Coluna e Chave Primária !!
    @PrimaryGeneratedColumn()
    id: number

    // Cria uma Coluna (nesse caso, de name !!)
    // type: Tipo de Dado que a Coluna representa ! (se NÃO passar isso, Gera Automaticamente uma espécia de varchar !!)  
    @Column({type: 'text'})
    name_bank: string

    @Column({type: 'text'})
    type_user: string

    // Transforma essa propriedade em um ARRAY do Tipo Account !

    // O contrário de ManyToOne, é uma Relação de UM para MUITOS, nesse caso, UM Banco para MUITAS Contas !!! <
    //(() => Entidade a ser usada como MUITOS, Entidade MUITOS => Entidade MUITOS.alguma Propriedade (Isso serve para quando é o INVERSO, MUITOS chamando UM !!) )
    @OneToMany(() => Account, account => account.bank)
    accounts: Account[]
}