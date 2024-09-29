import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerService } from './services/customer.service';
import { CustomersEntity } from './entities/customers.entity';
import { CustomersController } from './controller/customer.controller';
import { LoggerModule } from 'src/common/logger/logger.module';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';
import { AuthModule } from '../auths/auths.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomersEntity]),
    LoggerModule,
    AuthModule
  ],
  controllers: [CustomersController],
  providers: [CustomerService, CustomerRepository, AuthorizationGuard],
  exports: [CustomerService],
})
export class CustomersModule {}
