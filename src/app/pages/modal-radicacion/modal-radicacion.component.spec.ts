import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSucces } from './modal-radicacion.component';


fdescribe('Suit de test unitarios para el componente ModalComponent', () => {
  let component: ModalSucces;
  let fixture: ComponentFixture<ModalSucces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSucces],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSucces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se debio crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
