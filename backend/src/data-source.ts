import { DataSource } from "typeorm";
import { existsSync } from 'fs';
import { config } from 'dotenv';

const envPath = existsSync('../.env.local') ? '../.env.local' : '../.env';
config({ path: envPath });

export default new DataSource({
    
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});