// src/services/customer.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { CreateAccountDTO } from '../dtos';
import { Customers } from '../entities/customers.entity';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { Client } from "@okta/okta-sdk-nodejs";


@Injectable()
export class CustomerService {

  constructor(
    private readonly customerRepo: CustomerRepository,
    private logger: CustomLoggerService,
  ) {}

  async createCustomer(customer: CreateAccountDTO): Promise<Customers[]> {
    try {
      const { first_name, last_name, date_of_birth, address, phone, email, account_type, balance } = customer;
      if (!first_name || !last_name || !date_of_birth || !address || !phone || !email || !account_type || balance === undefined) {
        throw new BadRequestException('Missing required fields');
      }
      return await this.customerRepo.createCustomerRepo(customer);
    } catch(error) {
      this.logger.error(`Failure Create Customer`, error);
      throw error;
    }
  }

  async getCustomers(): Promise<Customers[]> {
    try {
      return await this.customerRepo.getCustomersRepo();
    } catch(error) {
      this.logger.error(`Failure Get Customer`, error);
      throw error;
    }
  }

  async getCustomer(customer_id: number): Promise<Customers[]> {
    try {
      const customer = await this.customerRepo.getCustomerRepo(customer_id);
      if(!customer) {
        throw new BadRequestException('Customer Not Found!');
      }
      return customer;
    } catch(error) {
      this.logger.error(`Failure Get Customer`, error);
      throw error;
    }
  }

  public async login(email: string, password: string): Promise<Customers> {
    try {
      const customer = await this.customerRepo.loginCustomerRepo(email, password);
      return customer;
    } catch (error) {
      this.logger.error(`Login failed for email: ${email}`, error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
