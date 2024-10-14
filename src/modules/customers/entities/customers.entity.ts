import { Loans } from 'src/modules/loans/entities/loans.entity';
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'customer'})
export class CustomersEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100})
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({default: 'user'})
  account_type: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({default: 'USER'})
  role: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Loans, loan => loan.customer)
  loans: Loans[];

  @OneToMany(() => Transactions, transaction => transaction.customer)
  transactions: Transactions[];
  lenght: number;
}
