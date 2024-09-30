import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { UserNotFoundException, UserPasswordNotValidException } from 'src/common/exceptions';
import { CustomerService } from 'src/modules/customers/services/customer.service';
import { CustomersEntity } from 'src/modules/customers/entities/customers.entity';
import { SignInDto } from '../dtos/signIn.dto';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from '../dtos/tokenPayload.dto';

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

  async validateCustomer(user: SignInDto): Promise<CustomersEntity> {
    try {
      const {email, password} = user;
      const customerExist = await this.customerService.getCustomerByEmail(email);
      if(!customerExist) {
        throw new UserNotFoundException();
      }

      const isMatch = await bcrypt.compare(password, customerExist.password);
      if(!isMatch) {
        throw new UserPasswordNotValidException();
      }
     
      return customerExist;
    } catch(error) {
      this.logger.error(`Failure SignIn Customer`, error);
      throw error;
    }
  }

  public async createToken(user: CustomersEntity): Promise<TokenPayloadDto> {
    const {
      customer_id,
      role: role 
    } = user;

    return new TokenPayloadDto({
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtServ.signAsync({ customer_id, role }),
    });
  }
}
