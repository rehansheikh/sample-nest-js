import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], { message: 'role must be INTERN, ADMIN, or ENGINEER' })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';

    @IsEmail()
    email: string;

    @IsString()
    status: string;
}