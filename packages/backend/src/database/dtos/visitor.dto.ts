import { Exclude } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class VisitorDto {
    constructor(partial: Partial<VisitorDto>) {
        Object.assign(this, partial);
    }

    // id: number;
    
    @IsDate()
    @IsNotEmpty()
    birth_date: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    patronymic: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @MaxLength(50)
    phone_num: string;

    @IsEmail()
    @IsOptional()
    email?: string;
    
    @IsString()
    @Exclude()
    login_password: string;
}