import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DogService } from './dog.service';

describe('DogService', () => {
  let service: DogService;
  // let httpClient: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;

  // beforeEach(()=>{
  //   httpClient = jasmine.createSpyObj<HttpClient>('HttpClient',['get']);
  //   service = new DogService(httpClient);
  // })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDogs', ()=>{
    it('should create a get request to /api/dogs', async ()=>{
      const getDogsPromise = service.getDogs();

      httpTestingController.expectOne('/api/dogs').flush([]);

      await expectAsync(getDogsPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async ()=>{
      const getDogsPromise = service.getDogs();

      httpTestingController.expectOne('/api/dogs').flush([]);

      await expectAsync(getDogsPromise).toBeResolvedTo([]);
    });
  })


});
