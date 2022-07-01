import { LogService } from './log.service';
import { LogRepository } from './log.repository';
import { Log } from './log.entity';

describe('LogService', () => {
  let service: LogService;

  const logRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    service = new LogService(logRepository as unknown as LogRepository);
  });

  describe('.create', () => {
    it('Should call this method with expected log entity instance', async () => {
      const expectedLogEntity = new Log('test', 55);

      await service.saveLogInDatabase(
        expectedLogEntity.timeInMilliseconds,
        expectedLogEntity.endpointUri,
      );

      expect(logRepository.create).toBeCalledWith(expectedLogEntity);
    });
  });
});
