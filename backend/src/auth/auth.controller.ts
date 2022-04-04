import { Controller, Body, Post, ClassSerializerInterceptor, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dtro';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {} 

@Post('register')
@UseInterceptors(ClassSerializerInterceptor)
    register (@Body() body: RegisterDto): Promise<User | never> {
        return this.authService.register(body);
    }
}
