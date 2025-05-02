import { BadRequestException, Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { encodePassword } from 'src/common/utils/bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';

@Injectable()
export class StaffRepository {
  private db: IDatabase<any>;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
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
    if (depId) conditions.push('department_id = $(depId)');
    const whereClause = conditions.length
      ? 'WHERE ' + conditions.join(' AND ')
      : '';

    const sql = `
      SELECT * FROM staff
      ${whereClause}
      ORDER BY ${sortBy} ${order}
    `;
    return await this.db.any(sql, { depId });
  }

  async findOne(condition: Record<string, any>) {
    const keys = Object.keys(condition);
    const values = Object.values(condition);

    const whereClause = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(' AND ');
    const sql = `SELECT * FROM staff WHERE ${whereClause} LIMIT 1`;

    return this.db.oneOrNone(sql, values);
  }

  async findSignedContracts(staff_id: number, sortBy: string, order: string) {
    const query = `
    SELECT staff.id, staff.staff_name,  staff.surname , contract.contract_num, contract.total_sum
    FROM staff INNER JOIN staff_contract ON staff.id = staff_contract.staff_id
      INNER JOIN contract ON staff_contract.contract_num = contract.contract_num
    WHERE staff.id = $1
    ORDER BY contract.${sortBy} ${order}
    `;

    return await this.db.any(query, [staff_id]);
  }

  async create(createStaffDto: CreateStaffDto) {
    createStaffDto.login_password = encodePassword(
      createStaffDto.login_password,
    );

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
      updateStaffDto.login_password = encodePassword(
        updateStaffDto.login_password,
      );
    }

    const { setClause, values } =
      this.repositoryService.prepareUpdateData(updateStaffDto);

    if (setClause.length === 0)
      throw new BadRequestException('No fields to update');

    const sql = `
		UPDATE staff
		SET ${setClause.join(', ')}
		WHERE id = ${id}
		RETURNING *;
	`;
    return await this.db.oneOrNone(sql, values);
  }

  async delete(id: number) {
    const sql = 'DELETE FROM staff WHERE id = $1 RETURNING *';
    return await this.db.oneOrNone(sql, [id]);
  }
}
