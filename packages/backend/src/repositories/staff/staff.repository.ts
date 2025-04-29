import { Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { encodePassword } from 'src/common/utils/bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';

@Injectable()
export class StaffRepository {
  private db: pgPromise.IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async findAll({
    depId,
    sortBy,
    order,
  }: {
    depId?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    let conditions: string[] = [];
    if (depId) conditions.push('dep_id = $(depId)');
    const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const sql = `
      SELECT * FROM staff
      ${whereClause}
      ORDER BY ${sortBy} ${order}
    `;
    return await this.db.any(sql, { depId });
  }

  async findById(id: number) {
    const sql = 'SELECT * FROM staff WHERE id = $1';
    return await this.db.oneOrNone(sql, [id]);
  }

  async create(createStaffDto: CreateStaffDto) {
    createStaffDto.login_password = encodePassword(createStaffDto.login_password);

    const sql = `
      INSERT INTO staff 
        (contract_num, staff_name, surname, patronymic, salary, phone_num, qualification_cert_number_of_coach, email, department_id, login_password) 
      VALUES 
        ($(contract_num), $(staff_name), $(surname), $(patronymic), $(salary), $(phone_num), $(qualification_cert_number_of_coach), $(email), $(department_id), $(login_password)) 
      RETURNING *
    `;

    return await this.db.one(sql, createStaffDto);
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    if (updateStaffDto.login_password) {
      updateStaffDto.login_password = encodePassword(updateStaffDto.login_password);
    }

    const sql = `
      UPDATE staff SET 
        contract_num = COALESCE($(contract_num), contract_num),
        staff_name = COALESCE($(staff_name), staff_name),
        surname = COALESCE($(surname), surname),
        patronymic = COALESCE($(patronymic), patronymic),
        salary = COALESCE($(salary), salary),
        phone_num = COALESCE($(phone_num), phone_num),
        qualification_cert_number_of_coach = COALESCE($(qualification_cert_number_of_coach), qualification_cert_number_of_coach),
        email = COALESCE($(email), email),
        department_id = COALESCE($(department_id), department_id),
        login_password = COALESCE($(login_password), login_password)
      WHERE id = $(id)
      RETURNING *
    `;
    return await this.db.one(sql, { ...updateStaffDto, id });
  }

  async delete(id: number) {
    const sql = 'DELETE FROM staff WHERE id = $1 RETURNING *';
    return await this.db.oneOrNone(sql, [id]);
  }
}
