import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkListComponent } from './walk-list.component';

describe('WalkListComponent', () => {
  let component: WalkListComponent;
  let fixture: ComponentFixture<WalkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
