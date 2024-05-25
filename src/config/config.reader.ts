import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { AppConfig, AppConfigSchema } from './config.schema';

class ConfigReader {
  private static instance: ConfigReader;
  private config: AppConfig;
  private readonly logger = new Logger(ConfigReader.name);

  private constructor() {
    const env = process.env.NODE_ENV || 'development';
    // Construct absolute paths to the JSON configuration files
    const basePath = path.resolve(__dirname, '../../../envs/base.json');
    const envPath = path.resolve(__dirname, `../../../envs/${env}.json`);

    // Read and parse the JSON configurations
    const baseConfig = JSON.parse(fs.readFileSync(basePath, 'utf8')) as AppConfig;
    const envConfig = JSON.parse(fs.readFileSync(envPath, 'utf8')) as Partial<AppConfig>;

    // Merge the base and environment configurations
    this.config = this.mergeConfigs(baseConfig, envConfig);

    // Validate and initialize the configuration
    this.initConfig();
  }

  private async initConfig() {
    try {
      const validatedConfig = await AppConfigSchema.validate(this.config);
      this.config = validatedConfig as AppConfig;
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private mergeConfigs(baseConfig: AppConfig, envConfig: Partial<AppConfig>): AppConfig {
    for (const key of Object.keys(envConfig)) {
      if (typeof envConfig[key] === 'object' && envConfig[key] !== null && !Array.isArray(envConfig[key])) {
        if (!(key in baseConfig)) {
          baseConfig[key] = {} as any;
        }
        baseConfig[key] = this.mergeConfigs(baseConfig[key], envConfig[key] as Partial<AppConfig>);
      } else {
        // Only override base value if property exists in envConfig
        if (key in envConfig) {
          baseConfig[key] = envConfig[key] as any;
        }
      }
    }
    return baseConfig;
  }

  static getInstance(): ConfigReader {
    if (!ConfigReader.instance) {
      ConfigReader.instance = new ConfigReader();
    }
    return ConfigReader.instance;
  }

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }
}

export const appConfig = ConfigReader.getInstance();
