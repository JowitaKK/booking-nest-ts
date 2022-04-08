import { IsNotEmpty,IsOptional,IsString } from 'class-validator';

export class CreateBarberDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image: string | null;
  }