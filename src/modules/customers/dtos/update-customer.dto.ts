import { IsOptional, IsString, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/constants/customers.constant';

export class UpdateCustomerDTO {
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @IsOptional()
  @IsDateString() // Handle string -> date conversion in form-data
  readonly date_of_birth?: Date;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly account_type?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;

  @IsOptional()
  @Type(() => Number) // Convert the string value from form-data to number
  readonly balance?: number;
}
