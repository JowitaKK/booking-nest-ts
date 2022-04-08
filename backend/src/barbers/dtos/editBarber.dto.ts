import {IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

  export class EditBarberDto {
    @IsNumber()
    id: number;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image?: string | null;
  }