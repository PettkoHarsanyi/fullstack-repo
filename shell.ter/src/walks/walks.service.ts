import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { User, UserRole } from '../users/entity/user';
import { WalkDto } from './dto/walk.dto';
import { Walk } from './entities/walk';

@Injectable()
export class WalksService {

  constructor(
    @InjectRepository(Walk)
    private walkRepository: EntityRepository<Walk>
  ){}

  async create(walkDto: WalkDto, user: User): Promise<Walk> {
    const walk = new Walk();
    walk.duration = walkDto.duration;
    walk.dog = walkDto.dog;
    walk.walker = user;
    walk.from = walkDto.from;
    walk.to = walkDto.to;

    await this.walkRepository.persistAndFlush(walk);

    return walk;
  }

  async findAllOfUser(userId: number): Promise<Walk[]>{
    const filters: FilterQuery<Walk> = {};
    filters.walker = {id: userId}
    return await this.walkRepository.find(filters, {populate:['dog','walker']})
  }

  async findAll(walkDto: WalkDto, user: UserDto): Promise<Walk[]> {
    const filters: FilterQuery<Walk> = {};

    if(user.role === UserRole.Volunteer){
      filters.walker = {id: user.id}
    }
    
    return await this.walkRepository.find(filters, {
      populate: ['walker','dog','walker.name','dog.name'],
      orderBy: {
        from: "asc",
      },
    });
  }


}
