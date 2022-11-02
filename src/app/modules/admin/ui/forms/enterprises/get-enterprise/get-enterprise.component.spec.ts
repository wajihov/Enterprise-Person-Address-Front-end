import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEnterpriseComponent } from './get-enterprise.component';

describe('GetEnterpriseComponent', () => {
  let component: GetEnterpriseComponent;
  let fixture: ComponentFixture<GetEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
