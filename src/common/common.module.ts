import { Module } from '@nestjs/common';

import { castStringToObjectIdIfValid } from './cast-string-to-object-id-if-valid';
import { CAST_STRING_TO_OBJECT_ID_IF_VALID_PROVIDER } from './cast-string-to-object-id-if-valid-provider.constant';

@Module({
  providers: [
    {
      provide: CAST_STRING_TO_OBJECT_ID_IF_VALID_PROVIDER,
      useValue: castStringToObjectIdIfValid,
    },
  ],
  exports: [
    {
      provide: CAST_STRING_TO_OBJECT_ID_IF_VALID_PROVIDER,
      useValue: castStringToObjectIdIfValid,
    },
  ],
})
export class CommonModule {}
