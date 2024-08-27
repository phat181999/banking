import { Customers } from 'src/modules/customers/entities/customers.entity';
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  AccountID: number;

  @Column()
  AccountType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Balance: number;

  @Column({ type: 'date' })
  DateOpened: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Customers, customer => customer.accounts)
  customer: Customers;

  @OneToMany(() => Transactions, transaction => transaction.account)
  transactions: Transactions[];
}
