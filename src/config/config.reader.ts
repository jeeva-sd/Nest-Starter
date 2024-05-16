import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { AppConfig, AppConfigSchema } from './config.schema';

@Injectable()
export class ConfigReader {
  private readonly config: AppConfig;
  private readonly logger = new Logger(ConfigReader.name);

  constructor() {
    const env = process.env.NODE_ENV || 'development';

    // Construct absolute paths to the JSON configuration files
    const basePath = path.resolve(__dirname, '../../envs/base.json');
    const envPath = path.resolve(__dirname, `../../envs/${env}.json`);

    // Read and parse the JSON configurations
    const baseConfig = JSON.parse(fs.readFileSync(basePath, 'utf8')) as AppConfig;
    const envConfig = JSON.parse(fs.readFileSync(envPath, 'utf8')) as Partial<AppConfig>;

    // Read and parse the JSON configurations
    const mergedConfig = this.mergeConfigs(baseConfig, envConfig);
    const validatedConfig = AppConfigSchema.validate(mergedConfig).catch((err) => {
      this.logger.error(err);
      process.exit(1);
    });

    this.config = validatedConfig as AppConfig;
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

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }
}
