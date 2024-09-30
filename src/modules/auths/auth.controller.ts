import { Controller, Get, UseGuards, Req, Res, Body, Next, HttpStatus, BadRequestException, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { AuthService } from './services/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { SignInPayloadDto } from './dtos/signInPayload.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private logger: CustomLoggerService
  ) {}

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<SignInPayloadDto> {
      const customer = await this.authService.validateCustomer(signInDto);
      const token = await this.authService.createToken(customer);
      const result: SignInPayloadDto = {
        user: customer, // Populate user with the customer data
        token: token,   // Populate token with the generated token data
      };
      return result;
  }

  @Get('callback')
  @UseGuards(AuthGuard('okta'))
  callback(@Req() req, @Res() res) {
    // Handle successful authentication and redirect
    res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}
