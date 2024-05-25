import { MySql2Database } from 'drizzle-orm/mysql2';
import { localSchema } from './localDB.schema';
import { sqlConnections } from 'src/services';

// Get connections
export const localDB = sqlConnections.getConnection('localDB', localSchema) as MySql2Database<typeof localSchema>;