import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsers = [
      { id: 1, name: 'Alice', role: 'ENGINEER', status: 'ACTIVE' },
      { id: 2, name: 'Bob', role: 'ADMIN', status: 'INACTIVE' },
      { id: 3, name: 'Charlie', role: 'INTERN', status: 'ACTIVE' },
    ]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array for findAll', () => {
    expect(controller.findAll()).toEqual(mockUsers);
  });

  it('should return user by id for findOne', () => {
    const userId = 1;
    expect(controller.findOne(userId)).toEqual(mockUsers[0]);
  });

  it('should create a user', () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', role: 'ENGINEER', status: 'ACTIVE', email: 'john@example.com' };
    const createdUser = controller.create(createUserDto);
    expect(createdUser).toEqual({ id: expect.any(Number), ...createUserDto });
  });

  it('should update a user', () => {
    const userId = 1;
    const updateUserDto = { name: 'Jane Doe' };
    const updatedUser = controller.update(userId, updateUserDto);
    expect(updatedUser?.name).toEqual('Jane Doe');
  });

  it('should remove a user', () => {
    const userId = 1;
   const removedUser = controller.remove(userId);
    expect(removedUser?.id).toEqual(userId);
    expect(removedUser?.status).toBe('DELETED');
  });
});
