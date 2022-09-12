import { LogService } from './log.service';
import { Log } from './log.entity';
import { Repository } from 'typeorm';

describe('LogService', () => {
  let service: LogService;

  const logRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    service = new LogService(logRepository as unknown as Repository<Log>);
  });

  describe('.create', () => {
    it('Should call this method with expected log entity instance', async () => {
      const expectedLogEntity = new Log('test', 55);

      await service.saveLogInDatabase(
        expectedLogEntity.timeInMilliseconds,
        expectedLogEntity.endpointUri,
      );

      expect(logRepository.save).toBeCalledWith(expectedLogEntity);
    });
  });
});
