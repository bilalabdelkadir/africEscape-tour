import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    hashingService = module.get<HashingService>(HashingService);
  });

  describe('hash', () => {
    it('should hash the password', async () => {
      const password = 'password123';
      const hashedPassword = await hashingService.hash(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('compareHash', () => {
    it('should return true for matching passwords', async () => {
      const password = 'password123';
      const hashedPassword = await hashingService.hash(password);
      const isMatch = await hashingService.compareHash(
        password,
        hashedPassword,
      );

      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password1 = 'password123';
      const password2 = 'wrongpassword';
      const hashedPassword = await hashingService.hash(password1);
      const isMatch = await hashingService.compareHash(
        password2,
        hashedPassword,
      );

      expect(isMatch).toBe(false);
    });
  });
});
