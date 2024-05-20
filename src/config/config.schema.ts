import * as yup from 'yup';

export const databaseConfigSchema = yup.object().shape({
  host: yup.string(),
  port: yup.number(),
  username: yup.string(),
  password: yup.string(),
  dbName: yup.string(),
});

export const payloadValidationSchema = yup.object().shape({
  abortEarly: yup.boolean().default(true),
  stripUnknown: yup.boolean().default(true),
  recursive: yup.boolean().default(true),
});

export const AppConfigSchema = yup.object().shape({
  port: yup.number(),
  database: databaseConfigSchema,
  payloadValidation: payloadValidationSchema,
});

// Config types
type DatabaseConfig = yup.InferType<typeof databaseConfigSchema>;
type AppConfig = yup.InferType<typeof AppConfigSchema>;

export type { AppConfig, DatabaseConfig };
