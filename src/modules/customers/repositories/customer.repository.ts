// src/repositories/customer.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomersEntity } from '../entities/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from '../dtos';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customerRepo: Repository<CustomersEntity>,
  ) {}

  public async createCustomerRepo(customer: CreateAccountDTO): Promise<CustomersEntity[]> {
    try {
      const { first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password } = customer;
      const query = `INSERT INTO customers_entity (first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
      const params = [first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password];
  
      const result = await this.customerRepo.query(query, params);
      return result[0];
    } catch(error) {
      throw error;
    }
  }

  public async getCustomersRepo(): Promise<CustomersEntity[]> {  
    try {
      const query = `SELECT * FROM customers_entity`;
      const result = await this.customerRepo.query(query);
      return result
    }catch(error) {
      throw error;
    }
  }

  public async getCustomerRepo(customer_id: number): Promise<CustomersEntity[]> {  
    try {
      const query = `SELECT * FROM customers_entity WHERE customer_id = $1`;
      const result = await this.customerRepo.query(query,[customer_id]);
      return result[0];
    }catch(error) {
      throw error;
    }
  }

  public async loginCustomerRepo(email: string, password: string): Promise<CustomersEntity> {
    try {
      const query = `SELECT * FROM customers_entity WHERE email = $1 AND password = $2`;
      const result = await this.customerRepo.query(query, [email, password]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async getCustomerByEmail(email: string):Promise<CustomersEntity> {
    try {
      const query = `SELECT * FROM customers_entity WHERE email = $1`;
      const result = await this.customerRepo.query(query, [email]);
      return result[0];
    }catch(error) {
      throw error;
    }
  }
}
