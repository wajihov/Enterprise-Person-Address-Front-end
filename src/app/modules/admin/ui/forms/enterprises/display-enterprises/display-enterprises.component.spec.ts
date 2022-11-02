import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEnterprisesComponent } from './display-enterprises.component';

describe('DiplayEnterprisesComponent', () => {
  let component: DisplayEnterprisesComponent;
  let fixture: ComponentFixture<DisplayEnterprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEnterprisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
