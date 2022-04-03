import { IsString } from 'class-validator';
//yarn add class-transformer class-validator

export class EditUsertDto {
    @IsString({ message: 'Your role shold be inserted'})
    role: string
}