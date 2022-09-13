import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DataSource } from 'typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule.register()],
  providers: [...databaseProviders],
  exports: [],
})
export class DatabaseModule {
  static forFeature({ entity, entityInjectionString }): DynamicModule {
    const entityProvider = {
      provide: entityInjectionString,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };

    return {
      module: DatabaseModule,
      providers: [entityProvider],
      exports: [entityProvider],
    };
  }
}
