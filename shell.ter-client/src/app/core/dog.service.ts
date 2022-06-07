import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from './dog';
import { Walk } from './walk';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) { }

  async getDogs(): Promise<Dog[] | undefined> {
    return (this.httpClient.get('/api/dogs') as Observable<Dog[]>).toPromise();
  }

  async getDog(id: number): Promise<Dog | undefined> {
    return (this.httpClient.get(`/api/dogs/${id}`) as Observable<Dog>).toPromise();
  }

  async createDog(dog: Dog): Promise<Dog | undefined>{
    const createdDog = await (this.httpClient.post('api/dogs',dog) as Observable<Dog>).toPromise();
    return createdDog;
  }

  async editDog(dogId: number, dog: Dog): Promise<Dog | undefined>{
    const modifiedDog = await (this.httpClient.patch(`api/dogs/${dogId}`,dog) as Observable<Dog>).toPromise();
    return modifiedDog;
  }

  async createWalk(dogId: number, walk: Walk): Promise<Walk | undefined>{
    const createdWalk = await (this.httpClient.post(`api/dogs/${dogId}/walks`,walk) as Observable<Walk>).toPromise();
    return createdWalk;
  }
}
