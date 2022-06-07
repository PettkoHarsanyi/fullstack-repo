import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { User, UserRole } from './entity/user';
import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { AuthService } from '../auth/auth.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private authService: AuthService
    ){}

    async findAll(userDto?: UserDto){
        return await this.userRepository.find({
            name: { $like: `%${userDto.name || ""}%`}
        });
    }

    async findOne(id:number): Promise<User>{
        return await this.userRepository.findOne(
            {id},
            {populate:['walks','dogs']}
        )
    }

    async update(id: number, userDto: UserDto){
        const user = await this.userRepository.findOne({id});

        user.name = userDto.name || user.name;
        user.userName = userDto.userName || user.userName;
        user.age = userDto.age || user.age;
        user.strength = userDto.strength || user.strength;

        await this.userRepository.persistAndFlush(user);

        return user;
    }

    async create(userAuthDto: UserAuthDto): Promise<User> {
        const user = new User();

        user.name = userAuthDto.name;
        user.userName = userAuthDto.userName;

        switch (userAuthDto.role) {
            case 0:
                user.role = UserRole.Admin;
                break;
            case 1:
                user.role = UserRole.Employee;
                break;
            case 2:
                user.role = UserRole.Volunteer;
                break;
            default:
                user.role = UserRole.Volunteer;
                break;
        }

        user.age = userAuthDto.age;
        user.strength = userAuthDto.strength;
        user.password = await this.authService.hashPassword(userAuthDto.password);

        await this.userRepository.persistAndFlush(user);

        return user;
    }

    
}
