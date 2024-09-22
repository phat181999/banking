import { Customers } from 'src/modules/customers/entities/customers.entity';
import { Payments } from 'src/modules/payments/entities/payments.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Loans {
  @PrimaryGeneratedColumn()
  LoanID: number;

  @Column()
  loan_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  loan_amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interset_rate: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  out_standing_amount: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Customers, customer => customer.loans)
  customer: Customers;

  @OneToMany(() => Payments, payment => payment.loan)
  payments: Payments[];
}
