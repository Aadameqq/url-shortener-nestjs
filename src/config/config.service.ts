import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_PROVIDER_NAME } from './config.constants';

@Injectable()
export class ConfigService {
  constructor(@Inject(CONFIG_PROVIDER_NAME) private config) {}

  public get(key: string): string {
    const value = this.config[key];

    if (!value)
      throw new Error(`Key ${key} doesn't exist in configuration file`);

    return value;
  }
}
