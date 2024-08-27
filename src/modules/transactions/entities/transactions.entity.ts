import { Accounts } from 'src/modules/accounts/entities/accounts.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @Column()
  TransactionType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number;

  @Column({ type: 'timestamp' })
  TransactionDate: Date;

  @Column({ nullable: true })
  Description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Accounts, account => account.transactions)
  account: Accounts;
}
