import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSobornoIntComponent } from './form-soborno-int.component';

describe('FormSobornoIntComponent', () => {
  let component: FormSobornoIntComponent;
  let fixture: ComponentFixture<FormSobornoIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSobornoIntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSobornoIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
