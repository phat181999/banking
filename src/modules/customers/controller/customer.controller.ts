import { Controller, Post, Body, BadRequestException, Res, Next, HttpStatus, Get, Param, UseGuards } from '@nestjs/common';
import { CreateAccountDTO } from '../dtos';
import { CustomerService } from '../services/customer.service';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { Response, NextFunction } from 'express';

@Controller('customer')
export class CustomersController {
  constructor(
    private readonly customerService: CustomerService,
    private logger: CustomLoggerService
  ) {}

  @Post('/')
  async createCustomer(
    @Body() createAccountDTO: CreateAccountDTO,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    try {
      const customer = await this.customerService.createCustomer(createAccountDTO);
      res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED, messages: 'Created Customer', customer: customer });

    } catch(error) {
      this.logger.error(`Failed to create customer due to unexpected error`, error);
      next(new BadRequestException('Failed to create customer due to unexpected error', error));
    } 
  }

  // @UseGuards(AuthorizationGuard)
  @Get('')
  async getCustomers(
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    try {
      const customer = await this.customerService.getCustomers();
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, messages: 'Get All Customer', customer: customer });
    } catch(error) {
      this.logger.error(`Failed to get customer due to unexpected error`, error);
      next(new BadRequestException('Failed to get customer due to unexpected error', error));
    } 
  }

  @Get('/:customer_id/search')
  async getCustomer(
    @Param('customer_id') customer_id: number,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    try {
      const customer = await this.customerService.getCustomer(customer_id);
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, messages: 'Get Detail Customer', customer: customer });
    } catch(error) {
      this.logger.error(`Failed to get detail customer due to unexpected error`, error);
      next(new BadRequestException('Failed to get detail customer due to unexpected error', error));
    } 
  }
}
