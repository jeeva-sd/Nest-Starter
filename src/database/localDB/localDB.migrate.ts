import mysql from 'mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import { appConfig } from 'src/config';
import { log } from 'console';
import { extractError } from 'src/utils';

(async () => {
  let connection = null;

  try {
    const { host, username: user, port, password, dbName: database } = appConfig.get('database');
    connection = mysql.createPool({ host, user, port, password, database, connectionLimit: 1 });

    const db = drizzle(connection);
    await migrate(db, { migrationsFolder: './local.migrations' });
    log('Migration done!');
  } catch (error) {
    console.error('Migration failed:', extractError(error));
  } finally {
    connection?.end();
  }
})();
