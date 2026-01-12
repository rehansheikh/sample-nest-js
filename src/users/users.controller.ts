import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER', @Query('status') status?: string) {
       return this.usersService.findAll({ role, status });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() createUserDto: {}) {
        return this.usersService.create(createUserDto as any);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: {}) {
        return this.usersService.update(+id, updateUserDto as any);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
