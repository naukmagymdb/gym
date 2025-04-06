import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async initializeDatabase() {
        try {
            if (this.dataSource.isInitialized) {
                console.log('DB already initialized!');
                return;
            }
            console.log('Initializing DB...');
            await this.dataSource.initialize();
            console.log('DB initialized!');
        } catch (err) {
            console.log('Error Connecting DB!');
            console.error(err);
            throw err;
        }
    }
}
