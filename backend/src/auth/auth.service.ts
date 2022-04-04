import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { LoginDto } from './dto/login.dtro';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo:Repository<User>) {}

    @Inject(AuthHelper)
  private readonly helper: AuthHelper;

async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repo.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repo.save(user);
  }

async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repo.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

async refresh(user: User): Promise<string> {
    this.repo.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}