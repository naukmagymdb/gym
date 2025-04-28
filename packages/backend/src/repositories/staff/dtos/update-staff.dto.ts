import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class UpdateStaffDto {
        @IsString()
        @IsOptional()
        @MaxLength(50)
        contract_num?: string = null;
    
        @IsString()
        @IsOptional()
        @MaxLength(50)
        first_name?: string = null;
        
        @IsString()
        @IsOptional()
        @MaxLength(50)
        last_name?: string = null;
    
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
        certificate_couch_number?: string = null;
    
        @IsEmail()
        @IsOptional()
        email?: string = null;
    
        @IsInt()
        @IsOptional()
        dep_id?: number = null;
        
        @IsString()
        @IsOptional()
        // @Exclude()
        login_password?: string = null;
}