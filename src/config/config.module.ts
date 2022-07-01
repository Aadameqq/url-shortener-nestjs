import * as dotenv from 'dotenv';
import { DynamicModule, Global, Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_PROVIDER_NAME } from './config.constants';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static async registerAsync(configFilePath: string): Promise<DynamicModule> {
    const file = await fs.readFileSync(
      path.join(__dirname, '../', configFilePath),
    );

    const config = dotenv.parse(file);

    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_PROVIDER_NAME,
          useValue: config,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
