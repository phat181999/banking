import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customers } from 'src/modules/customers/entities/customers.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @Column()
  transaction_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp' })
  transaction_date: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Customers, customer => customer.transactions)
  customer: Customers;
}
