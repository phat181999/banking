import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersModule } from '../customers/customers.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => CustomersModule),
    LoggerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
