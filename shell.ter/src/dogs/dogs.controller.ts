import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Roles } from '../auth/roles';
import { UserParam } from '../auth/user-param.decorator';
import { UserDto } from '../users/dto/user.dto';
import { User, UserRole } from '../users/entity/user';
import { WalkDto } from '../walks/dto/walk.dto';
import { DogsService } from './dogs.service';
import { DogDto } from './dto/dog.dto';

@Controller('dogs')
export class DogsController {

    constructor(private _dogsService: DogsService){}
    
    @Get()
    async findAll(
        @Query() dogDto: DogDto,
        ): Promise<DogDto[]> {
        const dogs =  await this._dogsService.findAll(dogDto);
        return dogs.map((dog)=> new DogDto(dog));
    }

    @Patch(":id")
    @Roles(UserRole.Admin)
    async update(
        @Param('id',ParseIntPipe) id: number,
        @Body() dogDto: DogDto,
        ): Promise<DogDto> {
        const newDog =  await this._dogsService.update(id, dogDto);
        return new DogDto(newDog);
    }

    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id : number): Promise<DogDto>{
        const dog = await this._dogsService.findOne(id);

        if(!dog){
            throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
        }

        return new DogDto(dog);
    }

    @Post()
    @Roles(UserRole.Volunteer)
    async create(@Body() dogDto: DogDto): Promise<DogDto>{
        const newDog = await this._dogsService.create(dogDto);

        return new DogDto(newDog);
    }  

    @Post(':id/walks')
    async addWalk(
        @Param('id',ParseIntPipe) id: number,
        @Body() walkDto: WalkDto,
        @UserParam() userDto: UserDto,
    ): Promise<WalkDto> {
        const walk = await this._dogsService.addWalk(id, walkDto, userDto);

        if(!walk){
            throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
        }

        return new WalkDto(walk);
    }

    @Get(":id/walks")
    async getWalks(
        @Param('id',ParseIntPipe) id: number,
    ): Promise<WalkDto[]> {
        const walks = await this._dogsService.getWalks(id);

        if(!walks){
            throw new HttpException('Walks not found', HttpStatus.NOT_FOUND);
        }

        return walks.map((walk) => new WalkDto(walk));
    }

}
