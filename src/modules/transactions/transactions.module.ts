import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  controllers: [],
  providers: [],
  exports: [],
})
export class LoansModule {}
