import { defineConfig } from 'drizzle-kit';
import { appConfig } from 'src/config';

const dbConfig = appConfig.get('database');

export default defineConfig({
  dialect: 'mysql',
  dbCredentials: {
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.dbName,
    port: dbConfig.port,
  },
  migrations: {
    table: 'migrations',
    schema: './src/database/localDB/localDB.schema.ts',
  },
  schema: './src/database/localDB/localDB.schema.ts',
  introspect: { casing: 'camel' },
});
