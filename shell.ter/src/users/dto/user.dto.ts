import { DogDto } from "../../dogs/dto/dog.dto";
import { WalkDto } from "../../walks/dto/walk.dto";
import { Walk } from "../../walks/entities/walk";
import { User, UserRole } from "../entity/user";

export class UserDto{
    id?: number;
    name?: string;
    role?: UserRole;
    age?: number;
    strength?: number;
    userName?: string;
    dogs?: DogDto[];


    constructor(user: User){
        if(user){
            this.id = user.id;
            this.name = user.name;
            this.role = user.role;
            this.age = user.age;
            this.strength = user.strength;
            this.userName = user.userName;
            if (user.dogs && user.dogs.isInitialized(true)) {
                this.dogs = user.dogs.getItems().map((dog) => new DogDto(dog));
            }
        }
    }
}