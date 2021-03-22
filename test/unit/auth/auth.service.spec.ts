import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../../src/users/users.module';
import { AuthService } from '../../../src/auth/auth.service';
import { EnvConfig } from '../../../src/common/config/env';
import { JwtStrategy } from '../../../src/auth/strategies/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: EnvConfig.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateUser', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: EnvConfig.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUser({ email: 'maria', password: 'guess'});
    expect(res.userId).toEqual(3);
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser({ email: 'xxx', password: 'xxx'});
    expect(res).toBeNull();
  });
});

describe('validateLogin', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: EnvConfig.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({ email: 'maria', password: "3" });
    expect(res.access_token).toBeDefined();
  });
});