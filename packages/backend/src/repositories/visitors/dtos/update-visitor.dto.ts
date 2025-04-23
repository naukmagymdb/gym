import { IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class UpdateVisitorDto  {
        @IsDate()
        @IsOptional()
        birth_date?: string = null;
    
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
    
        @IsPhoneNumber()
        @IsOptional()
        @MaxLength(50)
        phone_num?: string = null;
    
        @IsEmail()
        @IsOptional()
        email?: string = null;
        
        @IsString()
        // @Exclude()
        @IsOptional()
        login_password?: string = null;
}