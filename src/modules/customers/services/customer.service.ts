import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { CreateAccountDTO } from '../dtos';
import { CustomersEntity } from '../entities/customers.entity';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {

  constructor(
    private readonly customerRepo: CustomerRepository,
    private logger: CustomLoggerService,
    private configService: ConfigService
  ) {}

  async createCustomer(customer: CreateAccountDTO): Promise<CustomersEntity[]> {
    try {
      const { first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password } = customer;
      if (!first_name || !last_name || !date_of_birth || !address || !phone || !email || !account_type || balance === undefined || !password) {
        throw new BadRequestException('Missing required fields');
      }
      const saltOrRound = this.configService.get<number>('SALTORROUNDS');
      const salt = await bcrypt.genSalt(+saltOrRound);
      const hashedPass = await bcrypt.hash(password, salt);
      const createCustomer = {
        ...customer,
        password: hashedPass
      }
      return await this.customerRepo.createCustomerRepo(createCustomer);
    } catch(error) {
      this.logger.error(`Failure Create Customer`, error);
      throw error;
    }
  }

  async getCustomers(): Promise<CustomersEntity[]> {
    try {
      return await this.customerRepo.getCustomersRepo();
    } catch(error) {
      this.logger.error(`Failure Get Customer`, error);
      throw error;
    }
  }

  async getCustomer(customer_id: number): Promise<CustomersEntity[]> {
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

  public async login(email: string, password: string): Promise<CustomersEntity> {
    try {
      const customer = await this.customerRepo.loginCustomerRepo(email, password);
      return customer;
    } catch (error) {
      this.logger.error(`Login failed for email: ${email}`, error);
    }
  }

  public async getCustomerByEmail(email: string): Promise<CustomersEntity> {
    try {
      const result =  await this.customerRepo.getCustomerByEmail(email);
      if(result.lenght === 0) {
        throw new BadRequestException('Customer Not Found!');
      } 
      return result;
    }catch(error){
      this.logger.error(`getCustomerByEmail: ${email}`, error);
      throw new InternalServerErrorException('An error occurred while fetching the customer.');
    }
  }
}
