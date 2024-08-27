import { Customers } from 'src/modules/customers/entities/customers.entity';
import { Payments } from 'src/modules/payments/entities/payments.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Loans {
  @PrimaryGeneratedColumn()
  LoanID: number;

  @Column()
  LoanType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  LoanAmount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  InterestRate: number;

  @Column({ type: 'date' })
  StartDate: Date;

  @Column({ type: 'date' })
  EndDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  OutstandingAmount: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Customers, customer => customer.loans)
  customer: Customers;

  @OneToMany(() => Payments, payment => payment.loan)
  payments: Payments[];
}
