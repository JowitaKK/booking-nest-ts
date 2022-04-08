import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from './enums';

export class CreateUserDto {
    @IsString() 
    @IsNotEmpty()
    name: string;

    @IsString()
    role: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsEnum(UserRole, {
      message: () => {
        const roles = Object.values(UserRole);
        return `Role must be one of the following: ${roles.join(', ')}.`;
      },
    })
    role: UserRole;
}


