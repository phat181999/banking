import { Accounts } from 'src/modules/accounts/entities/accounts.entity';
import { Loans } from 'src/modules/loans/entities/loans.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  CustomerID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({ type: 'date' })
  DateOfBirth: Date;

  @Column()
  Address: string;

  @Column()
  Phone: string;

  @Column()
  Email: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Accounts, account => account.customer)
  accounts: Accounts[];

  @OneToMany(() => Loans, loan => loan.customer)
  loans: Loans[];
}
