import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateStaffDto {
    constructor(partial: Partial<CreateStaffDto>) {
        Object.assign(this, partial);
    }

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
    patronymic?: string = null;

    @IsInt()
    @IsNotEmpty()
    salary: number;

    // @IsPhoneNumber()
    @IsNotEmpty()
    @MaxLength(50)
    phone_num: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    certificate_couch_number?: string = null;

    @IsEmail()
    @IsOptional()
    email?: string = null;

    @IsInt()
    @IsNotEmpty()
    dep_id: number;
    
    @IsString()
    @IsNotEmpty() 
    // @Exclude()
    login_password: string;
}