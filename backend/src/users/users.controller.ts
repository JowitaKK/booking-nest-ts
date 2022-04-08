
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { EditUsertDto } from "./dtos/editUser.dto";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

//localhost:3000/users
@Get() 
getUsers() {
    return this.usersService.getAll();
}

//localhost:3000/users/1
@Get('/:id')
getUser(@Param('id') id: string) {
    return this.usersService.getById(parseInt(id))
}

// localhost:3000/users POST
@Post() 
addUser(@Body() body: CreateUserDto) {
    return this.usersService.add( body.name, body.password)
}

//localhost:3000/users/1 DELETE
@Delete('/:id')
@HttpCode(204)
removeUser(@Param('id') id: string) {
    this.usersService.remove(+id)
}

//localhost:3000/users/1 PATCH (editing parts of entieties other way use PUT)
@Patch('/:id')
editUser(@Body() body: EditUsertDto, @Param('id') id: string) {
    return this.usersService.edit(+id, body.role)
}
}