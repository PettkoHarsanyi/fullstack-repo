import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../core/user.service';

import { DogSummaryComponent } from './dog-summary.component';

describe('DogSummaryComponent', () => {
  let component: DogSummaryComponent;
  let fixture: ComponentFixture<DogSummaryComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ DogSummaryComponent ],
      providers: [{
        provide: UserService, useValue:{isAdmin: true},
      }]
    })
    .compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(DogSummaryComponent);
    component = fixture.componentInstance;

    component.dog = {
      name:"Szofi",
      type:"Labrador",
      age:5,
      strength: 10,
      walks: [],
      weight: 10,
    };

    component.showButtons = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the name of the dog', ()=>{
    const nameParagraph = fixture.debugElement.query(By.css("#dogName"));
    expect(nameParagraph.nativeElement.textContent).toBe('Szofi');
  });

  it('should emit editDog when clicking on edit', (done)=>{
    component.onEditDog.subscribe(()=>{
      done();
    })
    const editIssueButton = fixture.debugElement.query(By.css('#editDog'))
    editIssueButton.triggerEventHandler('click',null)
  })
});
