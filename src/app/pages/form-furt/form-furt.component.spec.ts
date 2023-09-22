import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFurtComponent } from './form-furt.component';

describe('FormFurtComponent', () => {
  let component: FormFurtComponent;
  let fixture: ComponentFixture<FormFurtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFurtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFurtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
