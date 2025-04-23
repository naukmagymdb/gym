import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateVisitorDto {
    constructor(partial: Partial<CreateVisitorDto>) {
        Object.assign(this, partial);
    }

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
    email?: string = null;
    
    @IsString()
    // @Exclude()
    login_password: string;
}