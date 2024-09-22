import { Controller, Get, UseGuards, Req, Res, Body, Next, HttpStatus, BadRequestException, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { NextFunction, Response } from 'express';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { SignInPayloadDto } from './dtos/signInPayload.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private logger: CustomLoggerService
  ) {}

  // @Post('login')
  // async signIn(
  //   @Body() signInDto: SignInDto,
  //   @Next() next: NextFunction
  // ): Promise<SignInPayloadDto> {
  //   const {email, password} = signInDto;
  //   try {
  //     const result = await this.authService.signIn(email, password);
  //     // return new SignInPayloadDto(user.toDto(), token);
  //   }catch(error) {
  //     this.logger.error(`Failed to create customer due to unexpected error`, error);
  //     next(new BadRequestException('Failed to create customer due to unexpected error', error));
  //   } 
  // }

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
