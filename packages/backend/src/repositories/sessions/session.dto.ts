import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  sid: string;

  @ValidateNested()
  @Type(() => SessionContentDto)
  sess: SessionContentDto;

  @IsDate()
  @IsNotEmpty()
  expire: Date;
}
