import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loans } from './entities/loans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loans])],
  controllers: [],
  providers: [],
  exports: [],
})
export class LoansModule {}
