import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class UpdateStaffDto {
        @IsString()
        @IsOptional()
        @MaxLength(50)
        contract_num?: string = null;

        @IsString()
        @IsOptional()
        @MaxLength(50)
        staff_name?: string = null;

        @IsString()
        @IsOptional()
        @MaxLength(50)
        surname?: string = null;

        @IsString()
        @IsOptional()
        @MaxLength(50)
        patronymic?: string = null;

        @IsInt()
        @IsOptional()
        salary?: number = null;

        @IsPhoneNumber()
        @IsOptional()
        @MaxLength(50)
        phone_num?: string = null;

        @IsString()
        @IsOptional()
        @MaxLength(50)
        qualification_cert_number_of_coach?: string = null;

        @IsEmail()
        @IsOptional()
        email?: string = null;

        @IsInt()
        @IsOptional()
        department_id?: number = null;

        @IsString()
        @IsOptional()
        // @Exclude()
        login_password?: string = null;
}