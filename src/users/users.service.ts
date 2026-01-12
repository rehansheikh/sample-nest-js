import { Injectable } from '@nestjs/common';


export interface User {
    id?: number;
    name: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
    status: string;
}
@Injectable()
export class UsersService {
    private users: User[] = [
        { id: 1, name: 'Alice', role: 'ENGINEER', status: 'ACTIVE' },
        { id: 2, name: 'Bob', role: 'ADMIN', status: 'INACTIVE' },
        { id: 3, name: 'Charlie', role: 'INTERN', status: 'ACTIVE' },
    ];

    findAll(filters?: { role?: 'INTERN' | 'ADMIN' | 'ENGINEER'; status?: string }) {
        const { role, status } = filters || {};
        let finalUsers = this.users;
        if (role) {
            finalUsers = finalUsers.filter(user => user.role === role);
        }
        if (status) {
            finalUsers = finalUsers.filter(user => user.status === status);
        }
        return finalUsers;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(createUserDto: User) {
        const id = this.users.length + 1;
        const newUser = { id: id, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }
    
    update(id: number, updateUserDto: Partial<User>) {
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
        this.users[userIndex] = { ...this.users[userIndex], status: 'INACTIVE' };
        return this.users[userIndex];
    }
}
