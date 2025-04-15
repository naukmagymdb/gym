import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseService } from "./services/database/database.service";
import { DbOptions } from "./utils/db.options";

@Module({})
export class DatabaseModule {
    static forRoot(options: DbOptions) : DynamicModule {
        return {
            module: DatabaseModule,
            controllers: [],
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options
                },
                DatabaseService
            ],
            exports: [DatabaseService],
            global: true
        }
    }
}