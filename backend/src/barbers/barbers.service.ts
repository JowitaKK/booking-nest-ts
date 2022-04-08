import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from './barber.entity';

@Injectable()
export class BarbersService {
    constructor(@InjectRepository(Barber) private repo: Repository<Barber> ) {}
     getAll() {
         return this.repo.find();
     }

     getById( id: number) {
         return this.repo.findOneBy({id});
     }

     add( name: string, image: string ) {
         const newBarber = this.repo.create({name, image});
         return this.repo.save(newBarber);

     }

     async remove( id: number) {
        const barber = await this.repo.findOne({where: {id}});
        this.repo.remove(barber)
    }

     async edit( id: number, desciption: string, image: string ) {
        const barber = await this.repo.findOneBy({id});
        barber.description = desciption;
        barber.image = image;
        return this.repo.save(barber);
    }    

}
