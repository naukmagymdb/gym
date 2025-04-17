import { Type } from "class-transformer";
import { IsString, ValidateNested, IsInt, IsOptional, IsNotEmpty } from "class-validator";

class SessionUser {
    @IsString()
    phone: string;

    @IsString()
    role: string;
}

class SessionPassport {
    @ValidateNested()
    @Type(() => SessionUser)
    user: SessionUser;
}

class SessionCookie {
    @IsInt()
    originalMaxAge: number;

    @IsString()
    expires: string;

    @IsOptional()
    httpOnly?: boolean;

    @IsOptional()
    path?: string;
}

export class SessionContentDto {
    @ValidateNested()
    @Type(() => SessionCookie)
    cookie: SessionCookie;

    @ValidateNested()
    @Type(() => SessionPassport)
    passport: SessionPassport;
}

export class SessionDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsInt()
    @IsNotEmpty()
    expiredAt: number;

    @ValidateNested()
    @Type(() => SessionContentDto)
    json: SessionContentDto;

    @IsOptional()
    destroyedAt?: Date;
}
