import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entity/user';
import { WalkDto } from '../walks/dto/walk.dto';
import { Walk } from '../walks/entities/walk';
import { DogDto } from './dto/dog.dto';
import { Dog } from './entities/dog';

@Injectable()
export class DogsService {
    private _dogs: Dog[] = [];
    private _nextId = 1;

    constructor(
        @InjectRepository(Dog)
        private dogRepository: EntityRepository<Dog>,
        @InjectRepository(Walk)
        private walkRepository: EntityRepository<Walk>,
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
    ){}
    
    async findAll(dogDto?: DogDto): Promise<Dog[]> {
        return await this.dogRepository.find({
            name: { $like: `%${dogDto.name || ""}%`}
        });
    }

    async findOne(id : number): Promise<Dog>{
        return await this.dogRepository.findOne(
            {id},
            {populate: ['walks','careTakers']}
            );
    }

    async update(id: number, dogDto: DogDto) {
        const dog = await this.dogRepository.findOne({id});
        dog.name = dogDto.name || dog.name;
        dog.type = dogDto.type || dog.type;
        dog.age = dogDto.age || dog.age;
        dog.weight = dogDto.weight || dog.weight;
        dog.strength = dogDto.strength || dog.strength;
        if(dogDto.walks){
            dog.walks.set(dogDto.walks.map((walk)=>this.walkRepository.getReference(walk.id)));
        }


        if(dogDto.careTakers){
            dog.careTakers.set(dogDto.careTakers.map((careTaker)=>this.userRepository.getReference(careTaker.id)));
        }

        await this.dogRepository.persistAndFlush(dog);
        await this.dogRepository.populate(dog, ['careTakers','walks']);

        return dog;
      }

    async create(dogDto: DogDto): Promise<Dog>{
        const dog = new Dog();
        dog.name = dogDto.name;
        dog.type = dogDto.type;
        dog.age = dogDto.age;
        dog.weight = dogDto.weight;
        dog.strength = dogDto.strength;

        await this.dogRepository.persistAndFlush(dog);
        await this.dogRepository.populate(dog,['walks','careTakers']);

        return dog;
    }  

    async addWalk(id: number, walkDto: WalkDto, userDto: UserDto){
        const dog = await this.findOne(id);
        if(!dog){
            return;
        }
        const walk = new Walk();
        walk.duration = walkDto.duration;
        walk.dog = dog;
        walk.walker = this.userRepository.getReference(userDto.id);
        walk.from = walkDto.from;
        walk.to = walkDto.to;

        dog.walks.add(walk);

        await this.dogRepository.flush();
        await this.walkRepository.populate(walk,['walker.name']);

        return walk;
    } 

    async getWalks(id: number): Promise<Walk[]>{
        const walks = await this.walkRepository.find({
            dog: id
        },
        {
            populate: ['walker.name'],
            orderBy: {
                from:"asc",
            }
        });
        return walks;
    }
}
