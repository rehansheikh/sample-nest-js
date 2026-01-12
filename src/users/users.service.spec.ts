import { Test, TestingModule } from '@nestjs/testing';
import { UsersService, User } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    const mockUsers: User[] = [
      { id: 1, name: 'Alice', role: 'ENGINEER', status: 'ACTIVE' },
      { id: 2, name: 'Bob', role: 'ADMIN', status: 'INACTIVE' },
      { id: 3, name: 'Charlie', role: 'INTERN', status: 'ACTIVE' },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    const users = service.findAll();
    expect(users.length).toBe(3);
  });

  it('should filter users by role', () => {
    const admins = service.findAll({ role: 'ADMIN' });
    expect(admins.length).toBe(1);
    expect(admins[0].name).toBe('Bob');
  });

  it('should filter users by status', () => {
    const activeUsers = service.findAll({ status: 'ACTIVE' });
    expect(activeUsers.length).toBe(2);
  });

  it('should filter users by role and status', () => {
    const internActiveUsers = service.findAll({ role: 'INTERN', status: 'ACTIVE' });
    expect(internActiveUsers.length).toBe(1);
    expect(internActiveUsers[0].name).toBe('Charlie');
  });

  it('should return empty array if no users match filters', () => {
    const result = service.findAll({ role: 'ADMIN', status: 'ACTIVE' });
    expect(result.length).toBe(0);
  });

  it('should return specific user by id', () => {
    const user = service.findOne(2);
    expect(user).toBeDefined();
    expect(user.id).toBe(2);
  })

  it('should return undefined for non-existing user id', () => {
    const user = service.findOne(999);
    expect(user).toBeUndefined();
  });

  it('should update the user based on id', () => {
    const user = service.findOne(1);
    expect(user).toBeDefined();
    expect(user.name).toBe('Alice');

    const updatedUser = service.update(1, {name: 'Alice Updated'});
    const updatedName = updatedUser.name;
    expect(updatedName).toBe('Alice Updated');
  })

  it('should create a new user', () => {
    const newUserDto = { name: 'David', role: 'ADMIN', status: 'ACTIVE' };
    const createdUser = service.create(newUserDto);
    expect(createdUser.name).toEqual(newUserDto.name);
  })

  it('should delete a user', () => {
    const userIdToDelete = 2;
    const deletedUser = service.delete(userIdToDelete, { status: 'DELETED' });
    expect(deletedUser?.status).toBe('DELETED');
  });
});
