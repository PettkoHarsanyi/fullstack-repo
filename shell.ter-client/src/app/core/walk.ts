import { Dog } from "./dog";
import { User } from "./user";

export interface Walk{
  id?: number;
  duration?: number;
  dog?: Dog;
  walker?: User;
  from: Date;
  to: Date;
  createdAt?: Date;
  modifiedAt?: Date;
}
