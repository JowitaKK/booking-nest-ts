import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Barber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column() 
    description: string;

    @Column() 
    image: string;
}