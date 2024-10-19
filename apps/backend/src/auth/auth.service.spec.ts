import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { Auth, User } from '@plant-care/types';

// Mock data and responses
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  password: 'hashed_password',
  refreshToken: 'hashed_refresh_token',
  firstName: 'Test',
  lastName: 'Test',
};

const mockTokens = {
  access_token: 'mock_access_token',
  refresh_token: 'mock_refresh_token',
};

// Mocks for dependencies
const mockUserService = {
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue(mockTokens.access_token), // Mock both access and refresh tokens (adjust if needed)
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
      case 'JWT_ACCESS_SECRET':
        return 'jwt_access_secret';
      case 'JWT_REFRESH_SECRET':
        return 'jwt_refresh_secret';
      default:
        return null;
    }
  }),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('me', () => {
    it('should return the user', async () => {
      mockUserService.findOne.mockResolvedValue(mockUser);
      const user = await authService.me(mockUser.id);
      expect(user).toEqual(mockUser);
    });
  });

  describe('hashData', () => {
    it('should hash data correctly', async () => {
      const data = 'test_data';
      const hashed = await authService.hashData(data);
      expect(await argon2.verify(hashed, data)).toBe(true);
    });
  });

  describe('getTokens', () => {
    it('should generate access and refresh tokens', async () => {
      const tokens = await authService.getTokens(mockUser.id, mockUser.email);
      expect(tokens).toEqual({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
      });

      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2); // Called once for access, once for refresh
    });
  });

  // describe('updateRefreshToken', () => {
  //   it('should update the user refresh token', async () => {
  //     const hashedRefreshToken = await argon2.hash('new_refresh_token');
  //     mockUserService.update.mockResolvedValue({
  //       ...mockUser,
  //       refreshToken: hashedRefreshToken,
  //     });
  //     await authService.updateRefreshToken(mockUser.id, 'new_refresh_token');
  //     expect(mockUserService.update).toHaveBeenCalledWith({
  //       where: { id: mockUser.id },
  //       data: {
  //         refreshToken: hashedRefreshToken,
  //       },
  //     });
  //   });
  // });

  describe('signup', () => {
    // it('should create a new user and return tokens', async () => {
    //   const registerDto: Auth.RegisterBody = {
    //     email: 'newuser@example.com',
    //     password: 'new_password',
    //   };
    //   const hashedPassword = await argon2.hash(registerDto.password);
    //   mockUserService.findByEmail.mockResolvedValue(null);
    //   mockUserService.create.mockResolvedValue({
    //     ...mockUser,
    //     email: registerDto.email,
    //     password: hashedPassword,
    //   });
    //   mockJwtService.signAsync
    //     .mockResolvedValueOnce(mockTokens.access_token)
    //     .mockResolvedValueOnce(mockTokens.refresh_token);

    //   const tokens = await authService.signup(registerDto);

    //   expect(tokens).toEqual(mockTokens);
    //   expect(mockUserService.create).toHaveBeenCalledWith({
    //     email: registerDto.email,
    //     password: hashedPassword,
    //   });
    //   expect(mockUserService.update).toHaveBeenCalledWith({
    //     where: { id: mockUser.id },
    //     data: { refreshToken: expect.any(String) }, // Check that refreshToken is updated
    //   });
    // });

    it('should throw an error if the email is taken', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser);
      await expect(
        authService.signup({
          email: mockUser.email,
          password: 'password',
        }),
      ).rejects.toThrowError('User already exists');
    });
  });

  // ... Add similar tests for login, logout, and refreshTokens
});
