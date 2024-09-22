import { Loans } from 'src/modules/loans/entities/loans.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  PaymentID: number;

  @Column({ type: 'date' })
  payment_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  payment_method: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Loans, loan => loan.payments)
  loan: Loans;
}
