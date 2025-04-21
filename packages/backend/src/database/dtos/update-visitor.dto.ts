import { Exclude } from "class-transformer";
import { IsDate, IsOptional, IsString, MaxLength, IsPhoneNumber, IsEmail } from "class-validator";

export class UpdateVisitorDto  {
        @IsDate()
        @IsOptional()
        birth_date?: string;
    
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
    
        @IsPhoneNumber()
        @IsOptional()
        @MaxLength(50)
        phone_num?: string;
    
        @IsEmail()
        @IsOptional()
        email?: string;
        
        @IsString()
        @Exclude()
        @IsOptional()
        login_password?: string;
}