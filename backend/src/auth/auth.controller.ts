import { Controller, Body, Post, ClassSerializerInterceptor, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dtro';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {} 

@Post('register')
@UseInterceptors(ClassSerializerInterceptor)
    register (@Body() body: RegisterDto): Promise<User | never> {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<string | never> {
        return this.authService.login(body);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    refresh(@Req() {user}: Request): Promise<string | never> {
        return this.authService.refresh(<User>user);
    }


}
