import * as yup from 'yup';

export const DatabaseConfigSchema = yup.object().shape({
  host: yup.string(),
  port: yup.number(),
  username: yup.string(),
  password: yup.string(),
  dbName: yup.string(),
});

export const AppConfigSchema = yup.object().shape({
  port: yup.number(),
  database: DatabaseConfigSchema,
});

// Config types
type DatabaseConfig = yup.InferType<typeof DatabaseConfigSchema>;
type AppConfig = yup.InferType<typeof AppConfigSchema>;

export type { AppConfig, DatabaseConfig };
