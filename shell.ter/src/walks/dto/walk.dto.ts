import { Dog } from "../../dogs/entities/dog";
import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entity/user";
import { Walk } from "../entities/walk";

export class WalkDto {
    id?: number;
    duration?: number;
    dog?: Dog;
    from?: Date;
    to?: Date;
    createdAt?: Date;
    modifiedAt?: Date;
    walker?: UserDto;

    constructor(walk?: Walk){
            this.id = walk.id;
            this.createdAt = walk.createdAt;
            this.modifiedAt = walk.modifiedAt;
            this.dog = walk.dog;
            this.duration = walk.duration;
            this.from = walk.from;
            this.to = walk.to;

            if(walk.walker && walk.walker instanceof User){
                this.walker = new UserDto(walk.walker)
            }
    }
}