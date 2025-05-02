import { Exclude } from 'class-transformer';

export class VisitorResponseDto {
  constructor(partial: Partial<VisitorResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  birth_date: string;
  visitor_name: string;
  surname: string;
  patronymic: string;
  phone_num: string;
  email: string;

  @Exclude()
  login_password: string;
}

export class VisitorFullResponseDto extends VisitorResponseDto {
  age: number;
}
