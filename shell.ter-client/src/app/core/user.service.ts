import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;

  get user(){
    return this._user;
  }

  get isAdmin():boolean{
    return this._user?.role === UserRole.Admin;
  }

  get canEdit():boolean{
    return this._user?.role === UserRole.Admin || this._user?.role === UserRole.Employee;
  }

  get canWalk():boolean{
    return this._user?.role === UserRole.Employee || this._user?.role === UserRole.Admin || this._user?.role == UserRole.Volunteer;
  }

  setUser(user: User | null) {
    this._user = user;
  }

  async editUser(userId: number, user: User){
    const modifiedUser = await (this.httpClient.patch(`api/users/${userId}`,user) as Observable<User>).toPromise();
    return modifiedUser;
  }

  async createUser(user: User | null){
    return (this.httpClient.post('api/users',user) as Observable<User>).toPromise();
  }

  async getUser(id: number): Promise<User | undefined>{
    return (this.httpClient.get(`/api/users/${id}`) as Observable<User>).toPromise();
  }

  async getUsers(): Promise<User[] | undefined>{
    return (this.httpClient.get("/api/users") as Observable<User[]>).toPromise();
  }

  constructor(private httpClient: HttpClient) { }
}
