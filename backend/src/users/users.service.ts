import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    
    getAll() {
        //return products
        return this.repo.find();
    }

    getById( id: number) {
        return this.repo.findOneBy({id});
    }

    add(name: string, role: string ) {
        const newUser = this.repo.create({name, role});
        return this.repo.save(newUser);
    }

    async remove( id: number) {
        const user = await this.repo.findOne({where: {id}});
        this.repo.remove(user)
    }
    
    async edit( id: number, role: string ) {
        const user = await this.repo.findOneBy({id});
        user.role = role;
        return this.repo.save(user);
    }
}