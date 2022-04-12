import { BarberDto, BarberServiceDto } from "../../api";
import { Decimal } from 'decimal.js';

export interface Barber {
    id: number;
    name: string;
    description: string;
    image: string | null;
    deleteAt? : Date;
    //property optional then its property must be undefined not null
}

export const barberFormDto = ( dto:BarberDto ) => {
    const barber: Barber = {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        image: dto.image,
        deleteAt: dto.deletedAt ? new Date(dto.deletedAt) : undefined,
    }
    return barber;
}


export interface BarberService {
  id: number;
  name: string;
  price: Decimal;
  description: string;
}

export const barberServiceFromDto = (dto: BarberServiceDto) => {
  const barberService: BarberService = {
    id: dto.id,
    name: dto.name,
    price: new Decimal(dto.price),
    description: dto.description,
  };
  return barberService;
}