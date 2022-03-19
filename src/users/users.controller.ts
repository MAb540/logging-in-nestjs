import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get('')
    getAll(){
        return this.usersService.findAllUsers();
    }

    @Get('/:userId')
    getUserById(@Param('userId') userId: number){
        return this.usersService.findUserById(userId);
    }


    @Post()
    createUser(@Body() body){
        const {name} = body;
        return this.usersService.createUser(name);
    }


    @Put('/:userId')
    updateUser(@Param('userId') userId:number, @Body() body){
        const {name} = body;
        return this.usersService.updateUser(userId, name);
    }

    @Delete('/:userId')
    deleteUser(@Param('userId') userId: number){
        return this.usersService.deleteUser(userId);
    }


}
