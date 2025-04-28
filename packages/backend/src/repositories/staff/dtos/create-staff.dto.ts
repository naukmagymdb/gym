import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateStaffDto {
    constructor(partial: Partial<CreateStaffDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    Contract_num: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    staff_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    surname: string;

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
    Qualification_cert_number_of_coach?: string = null;

    @IsEmail()
    @IsOptional()
    email?: string = null;

    @IsInt()
    @IsNotEmpty()
    Department_id: number;

    @IsString()
    @IsNotEmpty()
    // @Exclude()
    login_password: string;
}