import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customers/services/customer.service';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { SignInDto } from './dtos/signIn.dto';
import { CustomersEntity } from '../customers/entities/customers.entity';
import { UserNotFoundException } from 'src/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServ: JwtService,
    private configService: ConfigService,
    private customerService: CustomerService,
    private logger: CustomLoggerService,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const result =  await this.jwtServ.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      return result;
    }catch(error) {
      this.logger.error(`Failure Get Token`, error);
      throw error;
    }
  }

  async signIn(user: SignInDto):Promise <CustomersEntity> {
    try {
      const {email, password} = user;
      const customer = this.customerService.login(email, password);
      if(!customer) {
        throw new UserNotFoundException();
      }

      return customer;
    } catch(error) {
      this.logger.error(`Failure SignIn Customer`, error);
      throw error;
    }
  }
}
