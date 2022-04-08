import { tsMethodSignature } from '@babel/types';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { CreateBarberDto } from './dtos/createBarber.dto';
import { EditBarberDto } from './dtos/editBarber.dto';

@Controller('barbers')
export class BarbersController {
    constructor(private barbersService : BarbersService) {}

    @Get() 
    getBarbers() {
        return this.barbersService.getAll();
    }

    @Get(':/id')
    getBarber(@Param('id') id: string){
        return this.barbersService.getById(parseInt(id))
    }

    @Post() 
    add(@Body() body: CreateBarberDto) {
    return this.barbersService.add(  body.image, body.description)
}

    //localhost:3000/barbers/1 DELETE
    @Delete('/:id')
    @HttpCode(204)
    removeUser(@Param('id') id: string) {
        this.barbersService.remove(+id)
    }

    //localhost:3000/barbers/1 PATCH (editing parts of entieties other way use PUT)
    @Patch('/:id')
    editBarber(@Body() body: EditBarberDto, @Param('id') id: string) {
        return this.barbersService.edit(+id, body.image, body.description)
    }

}


