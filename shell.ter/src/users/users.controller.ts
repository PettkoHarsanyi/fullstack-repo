import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Roles } from '../auth/roles';
import { UserParam } from '../auth/user-param.decorator';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserDto } from './dto/user.dto';
import { UserRole } from './entity/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService, 
        private authService: AuthService){}

    @Get()
    async findAll(
        @Query() userDto: UserDto
    ){
        const users = await this.usersService.findAll(userDto);
        return users.map((user)=> new UserDto(user));
    }

    @Get(":id")
    async findOne(@Param('id',ParseIntPipe) id: number): Promise<UserDto>{
        const user = await this.usersService.findOne(id);

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return new UserDto(user);
    }

    @Patch(":id")
    @Roles(UserRole.Admin)
    async update(
        @Param('id',ParseIntPipe) id: number,
        @Body() userDto: UserDto,
        ): Promise<UserDto> {
        const newUser =  await this.usersService.update(id, userDto);
        return new UserDto(newUser);
    }

    @AllowAnonymous()
    @Post('')
    async create(@Body() userAuthDto: UserAuthDto){
        try{
            const newUser = await this.usersService.create(userAuthDto);
            return new UserDto(newUser);
        }catch(e){
            if(e instanceof UniqueConstraintViolationException){
                throw new HttpException('UserName is occupied', HttpStatus.CONFLICT)
            }else
            {
                throw e;
            }
        }
    }

    @AllowAnonymous()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@UserParam() user: UserDto){
        return {
            user,
            access_token: await this.authService.generateJwt(user),
          };
    }

}
