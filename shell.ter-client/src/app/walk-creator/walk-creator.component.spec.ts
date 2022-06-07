import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkCreatorComponent } from './walk-creator.component';

describe('WalkCreatorComponent', () => {
  let component: WalkCreatorComponent;
  let fixture: ComponentFixture<WalkCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
