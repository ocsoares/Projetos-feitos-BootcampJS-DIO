import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./Bank";
import { Fees } from "./Taxas";

    // Em algumas situações é Melhor usar uuid para não permitir possíveis brechas de segurança com o ID exposto na URL !! <<

@Entity('accounts')
export class Account{
    @PrimaryGeneratedColumn()
    id: number

                        // nullable = Permite ou Não esse campo ser Nulo !
    @Column({type: 'text', nullable: false})
    person_name: string

    @Column({type:'text', nullable: false})
    person_password: string

    @Column({type: 'text', nullable: false})
    cpf: number

    @Column({type: 'text', nullable: false})
    balance: number

    // Chave Estrangeira (FK) que vai se Relacionar com o Bank !

    // Relacionamento de MUITOS para UM, no caso, Várias Accounts para UM Bank !! <<
    // (() => Entidade a ser usada como UM, Entidade UM => Entidade UM.alguma Propriedade (Isso serve para quando é o INVERSO, UM chamando MUITOS !!) )
    @ManyToOne(() => Bank, bank => bank.accounts)
    @JoinColumn({name: 'bank_id'}) // Nome da Chave Estrangeira !! Se não por, ele Gera alguma Automaticamente !
    bank: Bank; // Atribui a bank_id o Objeto de Bank !!

    // Pela mesma Lógica, Também é MUITOS para MUITOS igual em Taxas !
    // (() => Entidade que está Relacionando, Nessa entidade => Se relaciona com ...)
    @ManyToMany(() => Fees, fees => fees.accounts)
    fees: Fees[]

    
}