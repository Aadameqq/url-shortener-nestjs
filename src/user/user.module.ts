import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { DatabaseModule } from '../database/database.module';
import { USER_REPOSITORY } from './user.constants';

const databaseModule = DatabaseModule.forFeature({
  entity: User,
  entityInjectionString: USER_REPOSITORY,
});

@Module({
  imports: [databaseModule],
  providers: [],
  exports: [databaseModule],
})
export class UserModule {}
