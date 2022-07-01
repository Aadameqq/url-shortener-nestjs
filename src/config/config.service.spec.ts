import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  const testConfig = {
    TEST: 'TEST',
  };

  beforeEach(async () => {
    service = new ConfigService(testConfig);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('.get', () => {
    it('Should return expected value When pass existing key as argument', () => {
      const key = 'TEST';
      const value = service.get(key);

      const expectedValue = testConfig[key];

      expect(value).toBe(expectedValue);
    });
    it('Should throw error When key do not exist', () => {
      expect(() => service.get('randomkeythatdoesntexist')).toThrowError();
    });
  });
});
