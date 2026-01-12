import { Injectable,  NotFoundException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'Alice', role: 'ENGINEER', status: 'ACTIVE' },
        { id: 2, name: 'Bob', role: 'ADMIN', status: 'INACTIVE' },
        { id: 3, name: 'Charlie', role: 'INTERN', status: 'ACTIVE' },
    ];

    findAll(filters?: { role?: 'INTERN' | 'ADMIN' | 'ENGINEER'; status?: string }) {
        const { role, status } = filters || {};
        let finalUsers = this.users;
        if (role) {
            finalUsers = finalUsers.filter(user => user.role === role);
            if (finalUsers.length === 0) {
                throw new NotFoundException(`No users found with role: ${role}`);
            }
        }
        if (status) {
            finalUsers = finalUsers.filter(user => user.status === status);
        }
        return finalUsers;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const id = this.users.length + 1;
        const newUser = { id: id, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex];
    }

    delete(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex] = { ...this.users[userIndex], status: 'DELETED' };
        return this.users[userIndex];
    }
}
