import * as yup from 'yup';

const serverOptionsSchema = yup.object().shape({
  logger: yup.boolean(),
  bodyLimit: yup.number(),
  caseSensitive: yup.boolean(),
  ignoreTrailingSlash: yup.boolean(),
  ignoreDuplicateSlashes: yup.boolean(),
});

const databaseConfigSchema = yup.object().shape({
  host: yup.string(),
  port: yup.number(),
  username: yup.string(),
  password: yup.string(),
  dbName: yup.string(),
});

const payloadValidationSchema = yup.object().shape({
  abortEarly: yup.boolean().default(true),
  stripUnknown: yup.boolean().default(true),
  recursive: yup.boolean().default(true),
});

const multipartOptionsSchema = yup.object().shape({
  limits: yup.object().shape({
    fileSize: yup.number().default(5242880), // Limit file size to 5MB by default
    fieldSize: yup.number().default(1024 * 1024), // Limit field size to 1MB by default
    fields: yup.number().default(10), // Limit number of fields to 10 by default
    files: yup.number().default(1), // Limit number of files to 1 by default
  }),
});

export const AppConfigSchema = yup.object().shape({
  appPort: yup.number().default(3050),
  appPrefix: yup.string().default('api'),
  server: serverOptionsSchema,
  database: databaseConfigSchema,
  payloadValidation: payloadValidationSchema,
  multiPart: multipartOptionsSchema,
});

// Config types
type ServerOptionsConfig = yup.InferType<typeof serverOptionsSchema>;
type DatabaseConfig = yup.InferType<typeof databaseConfigSchema>;
type AppConfig = yup.InferType<typeof AppConfigSchema>;
type PayloadValidationConfig = yup.InferType<typeof payloadValidationSchema>;
type MultipartOptions = yup.InferType<typeof multipartOptionsSchema>;

export type { AppConfig, DatabaseConfig, PayloadValidationConfig, ServerOptionsConfig, MultipartOptions };

// const staticFileServingSchema = yup.object().shape({
//   root: yup.string().required(),
//   prefix: yup.string().required(),
// });
