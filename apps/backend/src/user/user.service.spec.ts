import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@plant-care/types';

// Mock PrismaService to avoid actual database calls during testing
const mockPrismaService = {
  user: {
    count: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let mockUser: User;
  let mockUser2: User;
  let mockUsers: User[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: 'model',
          useValue: 'user',
        }, // Provide the mock
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      firstName: 'TestUser',
      lastName: 'TestUser',
      refreshToken: 'Refresh',
    };
    mockUser2 = {
      id: 2,
      email: 'test@example.com',
      password: 'hashed_password',
      firstName: 'TestUser',
      lastName: 'TestUser',
      refreshToken: 'Refresh',
    };
    mockUsers = [
      mockUser,
      {
        id: 3,
        email: 'user3@example.com',
        password: 'hashed_password',
        firstName: 'TestUser',
        lastName: 'TestUser',
        refreshToken: 'Refresh',
      },
      mockUser2,
    ];
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('count', () => {
    it('should return the number of users', async () => {
      // Mock data for Prisma
      mockPrismaService.user.count.mockResolvedValue(10);
      const count = await userService.count();
      expect(count).toBe(10);
      expect(prismaService.user.count).toHaveBeenCalled(); // Verify interaction
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const user = await userService.findOne({ id: 1 });
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const user = await userService.findOne({ id: 999 });

      expect(user).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const user = await userService.findByEmail('test@example.com');

      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if user with email not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      const user = await userService.findByEmail('nonexistent@example.com');
      expect(user).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
    });
  });
  describe('findMany', () => {
    it('should return an array of users', async () => {
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const users = await userService.findMany({}); // Empty object for basic retrieval

      expect(users).toEqual(mockUsers);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({});
    });

    it('should handle empty result', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([]);

      const users = await userService.findMany({});

      expect(users).toEqual([]);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });

    it('should apply where clause correctly', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([mockUser]);

      const users = await userService.findMany({
        where: { id: 1 },
      });

      expect(users).toEqual([mockUser]);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
    it('should apply skip and take options correctly', async () => {
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers.slice(1, 3));
      // We expect users with ids 2 and 3

      const users = await userService.findMany({
        skip: 1,
        take: 2,
      });

      expect(users).toEqual(mockUsers.slice(1, 3));
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        skip: 1,
        take: 2,
      });
    });

    it('should apply orderBy option for ascending order', async () => {
      const mockUsers: User[] = [
        {
          id: 2,
          email: 'user2@example.com',
          password: 'hashed_password',
          firstName: 'TestUser',
          lastName: 'TestUser',
          refreshToken: 'Refresh',
        },
        {
          id: 1,
          email: 'user1@example.com',
          password: 'hashed_password',
          firstName: 'TestUser',
          lastName: 'TestUser',
          refreshToken: 'Refresh',
        },
      ];
      const sortedUsers = [...mockUsers].sort((a, b) => a.id - b.id);
      mockPrismaService.user.findMany.mockResolvedValue(sortedUsers);

      const users = await userService.findMany({
        orderBy: { id: 'asc' }, // Assuming 'id' is a sortable field
      });

      expect(users).toEqual(sortedUsers);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
      });
    });

    it('should apply orderBy option for descending order', async () => {
      const sortedUsers = [...mockUsers].sort((a, b) => b.id - a.id);
      mockPrismaService.user.findMany.mockResolvedValue(sortedUsers);

      const users = await userService.findMany({
        orderBy: { id: 'desc' },
      });

      expect(users).toEqual(sortedUsers);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'desc' },
      });
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData: User.Args.Create = {
        email: 'newuser@example.com',
        password: 'hashed_password',
        firstName: 'TestName',
        lastName: 'TestName',
      };
      const mockCreatedUser: User = {
        id: 123,
        ...userData,
        refreshToken: null,
      };
      mockPrismaService.user.create.mockResolvedValue(mockCreatedUser);

      const createdUser = await userService.create(userData);

      expect(createdUser).toEqual(mockCreatedUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });

    // Negative Test Cases

    it('should throw an error if email is already taken', async () => {
      const userData: User.Args.Create = {
        email: 'existinguser@example.com',
        password: 'hashed_password',
        firstName: 'TestName',
        lastName: 'TestName',
      };
      const mockError = {
        code: 'P2002', // Prisma unique constraint error code (adjust if different)
        meta: { target: ['email'] },
      };
      mockPrismaService.user.create.mockRejectedValue(mockError);

      // Use try...catch to test for the error being thrown
      try {
        await userService.create(userData);
      } catch (error) {
        expect(error.code).toBe(mockError.code); // Check for Prisma error code
        // You can add more specific error message checks if needed
      }
    });

    it('should handle other Prisma errors gracefully', async () => {
      const userData: User.Args.Create = {
        email: 'anotheruser@example.com',
        password: 'hashed_password',
        firstName: 'TestName',
        lastName: 'TestName',
      };
      const mockError = new Error('Some database error');
      mockPrismaService.user.create.mockRejectedValue(mockError);

      try {
        await userService.create(userData);
      } catch (error) {
        expect(error).toEqual(mockError); // Or expect a specific error type
      }
    });
  });
  describe('update', () => {
    it('should update a user successfully', async () => {
      const userId = 1; // The ID of the user to update
      const updateData: User.Args.Update = {
        where: { id: userId },
        data: {
          email: 'updated@example.com',
          // ... other fields to update
        },
      };
      const mockUpdatedUser: User = {
        id: userId,
        email: 'updated@example.com',
        firstName: 'TestName',
        lastName: 'TestName',
        refreshToken: null,
        password: 'hashed_password',
      };
      mockPrismaService.user.update.mockResolvedValue(mockUpdatedUser);

      const updatedUser = await userService.update(updateData);

      expect(updatedUser).toEqual(mockUpdatedUser);
      expect(prismaService.user.update).toHaveBeenCalledWith(updateData);
    });

    it('should handle cases where no user is found', async () => {
      const updateData: User.Args.Update = {
        where: { id: 999 }, // Non-existent ID
        data: { email: 'update@example.com' },
      };

      mockPrismaService.user.update.mockRejectedValue(
        new Error('Record to update not found'),
      );

      try {
        await userService.update(updateData);
      } catch (error) {
        // Assert that an error is thrown or handle it according to your application's logic
        expect(error.message).toBe('Record to update not found'); // Adjust error message as needed
      }
    });

    it('should handle unique constraint violations (e.g., updating to an existing email)', async () => {
      const updateData: User.Args.Update = {
        where: { id: 1 },
        data: { email: 'existing@example.com' }, // Assuming this email already exists
      };
      const mockError = {
        code: 'P2002', // Example Prisma unique constraint error code
        meta: { target: ['email'] },
      };

      mockPrismaService.user.update.mockRejectedValue(mockError);

      try {
        await userService.update(updateData);
      } catch (error) {
        expect(error.code).toBe(mockError.code);
        // Add more specific error message checks if needed
      }
    });

    // Add more test cases to cover:
    // - Updating specific fields while leaving others unchanged.
    // - Other potential errors based on your business logic and Prisma schema.
  });

  describe('delete', () => {
    it('should delete a user successfully', async () => {
      const userIdToDelete = 1;
      const mockDeletedUser: User = {
        id: userIdToDelete,
        email: 'deleted@example.com',
        firstName: 'TestName',
        lastName: 'TestName',
        refreshToken: null,
        password: 'hashed_password',
      };
      mockPrismaService.user.delete.mockResolvedValue(mockDeletedUser);

      const deletedUser = await userService.delete({ id: userIdToDelete });

      expect(deletedUser).toEqual(mockDeletedUser);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: userIdToDelete },
      });
    });

    it('should handle cases where no user is found', async () => {
      const nonExistentUserId = 999;
      mockPrismaService.user.delete.mockRejectedValue(
        new Error('Record to delete does not exist.'),
      );

      try {
        await userService.delete({ id: nonExistentUserId });
      } catch (error) {
        expect(error.message).toBe('Record to delete does not exist.'); // Adapt message as needed
      }
    });

    // You might need additional test cases if your delete operation
    // has dependencies or side effects:
  });

  // Similar test cases for findMany, create, update, delete
  // ...
});
