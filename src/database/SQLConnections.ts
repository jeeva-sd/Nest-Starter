import { appConfig } from 'src/config';
import { SqlConnectionConfig } from './type';
import { SQLManager } from './SQLManager';

const spConfig = appConfig.get('database');

const connectionConfig: SqlConnectionConfig = {
  localDB: {
    host: spConfig.host,
    user: spConfig.username,
    port: spConfig.port,
    password: spConfig.password,
    database: spConfig.dbName,
    connectionLimit: 10,
  },
};

// Create a database manager instance
export const sqlConnections = new SQLManager(connectionConfig);
