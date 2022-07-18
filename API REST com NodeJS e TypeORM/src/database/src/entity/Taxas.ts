import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity('fees')
export class Fees{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    fee: number

    @Column({type: 'text'})
    discount: number

    // Relação de MUITOS para MUITOS, nesse caso, MUITAS Taxas e Descontos para MUITAS Contas !!

    // (() => Relação com MUITOS e o Inverso (dentro de Accounts => tem que ter MUITAS Taxas ) !)
    @ManyToMany(() => Account, account => account.fees)
    @JoinTable({ // Uma Tabela que faz Relação com OUTRAS Tabelas !
        name: 'account_fees', // Nome da Tabela de Ligação (nesse caso, Conta + Taxa ) !!
        joinColumn: { // Com quem a Coluna vai se Ligar !
            name: 'account_id',
            referencedColumnName: 'id' // Campo que FAZ a Ligação !
        },
        inverseJoinColumn: { // O Inverso do de cima !
            name: 'fee_id',
            referencedColumnName: 'id'
        }
    })
    accounts: Account[]
}