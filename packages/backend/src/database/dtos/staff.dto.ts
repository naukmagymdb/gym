import { Exclude } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class StaffDto {
    constructor(partial: Partial<StaffDto>) {
        Object.assign(this, partial);
    }

    // id: number;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    contract_num: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    patronymic?: string;

    @IsInt()
    @IsNotEmpty()
    salary: number;

    @IsPhoneNumber()
    @IsNotEmpty()
    @MaxLength(50)
    phone_num: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    certificate_couch_number?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsInt()
    @IsNotEmpty()
    dep_id: number;
    
    @IsString()
    @Exclude()
    login_password: string;
}