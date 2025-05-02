import { Exclude } from 'class-transformer';

export class StaffResponseDto {
  constructor(partial: Partial<StaffResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  contract_num: string;
  staff_name: string;
  surname: string;
  patronymic: string;
  salary: number;
  phone_num: string;
  qualification_cert_number_of_coach: string;
  email: string;
  department_id: number;

  @Exclude()
  login_password: string;
}
