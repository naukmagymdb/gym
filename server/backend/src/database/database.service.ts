import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeormStore } from 'connect-typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        @InjectRepository(Session) private sessionRepository: Repository<Session>
    ) { }

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

    getSessionStore() {
        return new TypeormStore({
            ttl: 60,
            cleanupLimit: 3
        }).connect(this.sessionRepository);
    }
}
