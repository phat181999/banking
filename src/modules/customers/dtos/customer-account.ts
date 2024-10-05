import { IsAlpha, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    DEVELOPER = "DEVELOPER",
}

export class CreateAccountDTO {

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @IsAlpha()
    readonly first_name: string;

    @IsString()
    @IsNotEmpty()
    readonly last_name: string;
    
    @IsDateString()
    @IsNotEmpty()
    readonly date_of_birth: Date;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsNumber()
    @IsNotEmpty()
    readonly phone: string;

    @IsString()
    readonly account_type: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak",
    })
    readonly password: string;

    @IsString()
    @IsEnum(Role, { each: true })
    readonly role: string;

    @IsInt()
    @Min(0)
    @IsOptional() // This makes the field optional in the incoming request
    readonly balance: number = 0;
}