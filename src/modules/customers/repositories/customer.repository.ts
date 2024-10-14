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
      const { first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password, role, avatar } = customer;
      const query = `INSERT INTO customer (first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password, role, avatar) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      const params = [first_name, last_name, date_of_birth, address, phone, email, account_type, balance, password, role, avatar];
  
      const result = await this.customerRepo.query(query, params);
      return result[0];
    } catch(error) {
      throw error;
    }
  }

  public async getCustomersRepo(): Promise<CustomersEntity[]> {  
    try {
      const query = `SELECT * FROM customer`;
      const result = await this.customerRepo.query(query);
      return result
    }catch(error) {
      throw error;
    }
  }

  public async getCustomerRepo(customer_id: string): Promise<CustomersEntity[]> {  
    try {
      const query = `SELECT * FROM customer WHERE customer_id = $1`;
      const result = await this.customerRepo.query(query,[customer_id]);
      return result[0];
    }catch(error) {
      throw error;
    }
  }

  public async loginCustomerRepo(email: string, password: string): Promise<CustomersEntity> {
    try {
      const query = `SELECT * FROM customer WHERE email = $1 AND password = $2`;
      const result = await this.customerRepo.query(query, [email, password]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async getCustomerByEmail(email: string):Promise<CustomersEntity> {
    try {
      const query = `SELECT * FROM customer WHERE email = $1`;
      const result = await this.customerRepo.query(query, [email]);
      return result[0];
    }catch(error) {
      throw error;
    }
  }

  // Partial makes all properties of a type optional useful foor update where not all fields are reuired
  public async updateCustomerById(customer_id: string, customer: Partial<CreateAccountDTO>):Promise<CustomersEntity> {
    try {
      const { first_name, last_name, date_of_birth, address, phone, email, account_type, balance, role, avatar } = customer;
      const query = `UPDATE customer 
        SET first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            date_of_birth = COALESCE($3, date_of_birth),
            address = COALESCE($4, address),
            phone = COALESCE($5, phone),
            email = COALESCE($6, email),
            account_type = COALESCE($7, account_type),
            balance = COALESCE($8, balance),
            role = COALESCE($9, role),
            avatar = COALESCE($10, avatar)
        WHERE customer_id = $11
        RETURNING *`;
        // COALESCE ensures that the field remains unchanged in the database 
      const params = [
        first_name,
        last_name,
        date_of_birth,
        address,
        phone,
        email,
        account_type,
        balance,
        role,
        avatar,
        customer_id
      ];
    
      const result = await this.customerRepo.query(query, params);
      return result[0];
    }catch(error) {
      throw error;
    }
  }

  public async deleteCustomer(customer_id: string): Promise<CustomersEntity> {
    try {
      const query = `DELETE FROM customer WHERE customer_id = $1`;
      const result = await this.customerRepo.query(query, [customer_id]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }
}
