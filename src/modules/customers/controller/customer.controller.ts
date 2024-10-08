import { Controller, Post, Body, BadRequestException, Res, Next, HttpStatus, Get, Param, UseGuards, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { CreateAccountDTO } from '../dtos';
import { CustomerService } from '../services/customer.service';
import { CustomLoggerService } from 'src/common/logger/logger.service';
import { Response, NextFunction } from 'express';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCustomerDTO } from '../dtos/update-customer.dto';

@Controller('customer')
export class CustomersController {
  constructor(
    private readonly customerService: CustomerService,
    private logger: CustomLoggerService
  ) {}

  @Post('/')
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(new ValidationPipe({ transform: true}))
  async createCustomer(
    @Body() createAccountDTO: CreateAccountDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<void> {
    try {
      const customer = await this.customerService.createCustomer(createAccountDTO, avatar);
      res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED, messages: 'Created Customer', customer: customer });
    } catch(error) {
      this.logger.error(`Failed to create customer due to unexpected error`, error);
      next(new BadRequestException('Failed to create customer due to unexpected error', error));
    } 
  }

  @UseGuards(AuthorizationGuard)
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

  @UseGuards(AuthorizationGuard)
  @Get('/:customer_id/search')
  async getCustomer(
    @Param('customer_id') customer_id: string,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    try {
      const customer = await this.customerService.getCustomerById(customer_id);
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, messages: 'Get Detail Customer', customer: customer });
    } catch(error) {
      this.logger.error(`Failed to get detail customer due to unexpected error`, error);
      next(new BadRequestException('Failed to get detail customer due to unexpected error', error));
    } 
  }

  @Patch('/:customer_id')
  @UsePipes(new ValidationPipe({ transform: true}))
  @UseGuards(AuthorizationGuard)
  async updateCustomer(
    @Param('customer_id') customer_id: string,
    @Body() updateCustomer: UpdateCustomerDTO,
    @Next() next: NextFunction,
    @Res() res: Response,
  ): Promise<void> {
    console.log(updateCustomer,"log 1")
    try{
      const customer = await this.customerService.updateCustomerById(customer_id, updateCustomer);
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, messages: 'Updated Customer', customer: customer });
    }catch(error) {
      this.logger.error(`Failed to get detail customer due to unexpected error`, error);
      next(new BadRequestException('Failed to get detail customer due to unexpected error', error));
    } 
  }

  @Delete('/:customer_id')
  @UseGuards(AuthorizationGuard)
  async deleteCustomer(
    @Param('customer_id') customer_id: string,
    @Next() next: NextFunction,
    @Res() res: Response,
  ): Promise<void> {
    try{
      const customer = await this.customerService.deleteCustomerById(customer_id);
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, messages: 'Deleted Customer', customer: customer });
    }catch(error) {
      this.logger.error(`Failed to get detail customer due to unexpected error`, error);
      next(new BadRequestException('Failed to get detail customer due to unexpected error', error));
    } 
  }
}
