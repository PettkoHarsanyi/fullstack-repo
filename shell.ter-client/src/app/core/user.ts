import { Dog } from "./dog";
import { Walk } from "./walk";

export interface User{
  id?: number;
  name?: string;
  role?: UserRole;
  strength?: number;
  userName?: string;
  age?: number;
  dogs?: Dog[];
}

export enum UserRole{
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Volunteer = 'VOLUNTEER'
}
