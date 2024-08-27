import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CustomersModule {}
