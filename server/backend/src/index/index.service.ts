import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class IndexService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async testFunc() {
        const pool = this.databaseService.getPool();
        const client = await pool.connect();

        try {
            const resVisitors = await client.query('SELECT * FROM visitor');
            const resDepartments = await client.query('SELECT * FROM department');
            const resStaff = await client.query('SELECT * FROM staff');
    
            return {
                visitors: resVisitors.rows,
                departments: resDepartments.rows,
                staff: resStaff.rows
            };
        } finally {
            client.release();
        }
    }
}
