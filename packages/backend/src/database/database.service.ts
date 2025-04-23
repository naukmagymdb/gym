import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as connectPgSimple from 'connect-pg-simple';
import * as session from 'express-session';
import * as pgPromise from 'pg-promise';
import { IDatabase } from 'pg-promise';
import { DbOptions } from 'src/database/utils/db.options';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private db: IDatabase<any>;
  private initialized: boolean = false;

  constructor(@Inject('CONFIG_OPTIONS') private readonly config: DbOptions) {
    const pgp = pgPromise();

    this.db = pgp({
      host: this.config.host || process.env.POSTGRES_HOST,
      port: this.config.port ?? +process.env.POSTGRES_PORT,
      user: this.config.user || process.env.POSTGRES_USER,
      password: this.config.password || process.env.POSTGRES_PASSWORD,
      database: this.config.database || process.env.POSTGRES_DATABASE,
    });
  }

  getDb(): IDatabase<any> {
    return this.db;
  }

  async waitForConnection(
    retries: number = this.config.retryAttempts ?? 3,
    delay: number = this.config.delay ?? 2000,
  ) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await this.db.one('SELECT 1');
        this.initialized = true;
        console.log('Database connection established!');
        return;
      } catch (err) {
        console.error(
          `DB connection attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
        );
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    throw new Error(
      'Could not connect to the database after multiple attempts!',
    );
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getSessionStore() {
    const pgSession = connectPgSimple(session);
    return new pgSession({
      pool: this.db.$pool,
      tableName: 'session',
    });
  }

  async onModuleDestroy() {
    await this.db.$pool.end();
  }
}
