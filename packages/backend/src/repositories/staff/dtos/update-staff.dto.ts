import { Exclude } from "class-transformer";
import { IsString, MaxLength, IsOptional, IsInt, IsPhoneNumber, IsEmail } from "class-validator";

export class UpdateStaffDto {
        @IsString()
        @IsOptional()
        @MaxLength(50)
        contract_num?: string;
    
        @IsString()
        @IsOptional()
        @MaxLength(50)
        first_name?: string;
        
        @IsString()
        @IsOptional()
        @MaxLength(50)
        last_name?: string;
    
        @IsString()
        @IsOptional()
        @MaxLength(50)
        patronymic?: string;
    
        @IsInt()
        @IsOptional()
        salary?: number;
    
        @IsPhoneNumber()
        @IsOptional()
        @MaxLength(50)
        phone_num?: string;
    
        @IsString()
        @IsOptional()
        @MaxLength(50)
        certificate_couch_number?: string;
    
        @IsEmail()
        @IsOptional()
        email?: string;
    
        @IsInt()
        @IsOptional()
        dep_id?: number;
        
        @IsString()
        @IsOptional()
        @Exclude()
        login_password?: string;
}