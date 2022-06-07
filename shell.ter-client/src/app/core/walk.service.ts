import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Walk } from './walk';

@Injectable({
  providedIn: 'root'
})
export class WalkService {

  constructor(private httpClient: HttpClient) { }

  async getWalks(id: number): Promise<Walk[] | undefined>{
    return await (this.httpClient.get(`/api/dogs/${id}/walks`) as Observable<Walk[]>).toPromise();
  }

  async getWalkOfUser(id:number):Promise<Walk[] | undefined>{
    return await (this.httpClient.get(`/api/walks/${id}`) as Observable<Walk[]>).toPromise();
  }

  async getAllWalks(): Promise<Walk[] | undefined>{
    return await (this.httpClient.get(`/api/walks`) as Observable<Walk[]>).toPromise();
  }
}
