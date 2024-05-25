import { appConfig } from 'src/config';
import { SQLService } from './sql.service';
import { SqlConnectionConfig } from './type';

const spConfig = appConfig.get('database');

const connectionConfig: SqlConnectionConfig = {
  testDB: {
    host: spConfig.host,
    user: spConfig.username,
    port: spConfig.port,
    password: spConfig.password,
    database: spConfig.dbName,
    connectionLimit: 10,
  },
};

// Create a database manager instance
export const sqlConnections = new SQLService(connectionConfig);
