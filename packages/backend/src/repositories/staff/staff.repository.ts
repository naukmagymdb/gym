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
  private static columns = [
    'id',
    'contract_num',
    'staff_Name',
    'surname',
    'patronymic',
    'salary',
    'phone_num',
    'qualification_cert_number_of_coach',
    'email',
    'department_id',
  ];

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
    order?: string;
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

  async findAllSessions(
    staff_id: number,
    {
      visitor_id,
      sortBy,
      order,
    }: { visitor_id?: number; sortBy: string; order: string },
  ) {
    const sql = `
    SELECT 
      t.visitor_id,
      v.phone_num AS visitor_phone,
      t.staff_id,
      s.phone_num AS staff_phone,
      t.date_of_begin,
      t.date_of_end
    FROM Training t
    JOIN Visitor v ON v.id = t.visitor_id
    JOIN Staff s ON s.id = t.staff_id
    WHERE t.staff_id = $1
    ${visitor_id ? 'AND t.visitor_id = $2' : ''}
    GROUP BY 
      t.visitor_id, v.phone_num, 
      t.staff_id, s.phone_num,
      t.date_of_begin, t.date_of_end
    ORDER BY ${sortBy} ${order};
  `;

    return this.db.any(sql, visitor_id ? [staff_id, visitor_id] : [staff_id]);
  }

  static getColumns() {
    return this.columns;
  }
}
