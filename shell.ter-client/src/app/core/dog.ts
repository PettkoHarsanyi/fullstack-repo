import { User } from "./user";
import { Walk } from "./walk";

export interface Dog {
  id?: number;
  name: string;
  type: string;
  age: number;
  weight: number;
  strength: number;
  walks: Walk[];
  careTakers?: User[];
  createdAt?: Date;
  modifiedAt?: Date;
}
