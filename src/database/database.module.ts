import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DataSource } from 'typeorm';

@Module({
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
