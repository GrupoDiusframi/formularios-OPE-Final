import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Files } from 'src/app/models/Files.model';
import { TramitesServices } from 'src/app/services/tramites.service';
import { generateNArchivos } from 'src/app/helpers/mock testing/Files.mocks';

fdescribe('Suit de test unitarios para el componente ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let service: TramitesServices;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModalComponent],
      providers: [
        TramitesServices,
        MatDialog,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            subirArchivo: {
              principal: generateNArchivos(1)[0],
              anexos: generateNArchivos(5),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TramitesServices);
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios para el metodo archivoCarga', () => {
    it('Debio retornar true porque res no es vacio', () => {
      component.archivoCarga('testing');

      expect(component.cargarchivos).toBeFalse();
    });
  });

  describe('Test unitarios para el metodo cambiarpagina', () => {
    it('Debio retornar 4 y 8 porque se ejecuto correctamente el metodo cambiarpagina', () => {
      const mockPageEvent: PageEvent = {
        pageIndex: 1,
        pageSize: 4,
        length: 12,
      };

      expect(component.desde).toEqual(0);
      expect(component.hasta).toEqual(4);

      component.cambiarpagina(mockPageEvent);

      fixture.detectChanges();

      expect(component.desde).toEqual(4);
      expect(component.hasta).toEqual(8);
    });
  });

  /* describe('Test unitarios para el metodo filesOnservice', () => {
    it('Debio retornar true porque se llamo al metodo filesOnservice', () => {
      const mockFilesToUpload: Files = {
        principal: generateNArchivos(1)[0],
        anexos: generateNArchivos(5),
      };

      component.filesToUpload = mockFilesToUpload;
      component.filesOnservice();
      fixture.detectChanges();

      expect(component.filesToUpload).toEqual(mockFilesToUpload);
      expect(service.subirArchivo).toEqual(mockFilesToUpload);
    });
  });*/
/*
  describe('Test unitarios para el metodo openConfirmation', () => {
    it('Debio ser mostrado el modal cuando se llamo el metodo openConfirmation del componente', () => {
      component.openConfirmation();

      expect(document.querySelector('.alert')).toBeTruthy();
    });
  });
*/
  describe('Test unitarios para el metodo formatFileSize', () => {
    let valor = '';
    let valor1 = '';
    let valor2 = '';

    beforeEach(() => {
      valor = component.formatFileSize(8000);
    });
    beforeEach(() => {
      valor1 = component.formatFileSize(800);
    });
    beforeEach(() => {
      valor2 = component.formatFileSize(800000000);
    });
    it('Debio ser mostrado el modal cuando se llamo el metodo formatFileSize del componente con Tamaño 8000', () => {
      expect(valor).toEqual('7.81 KB');
    });

    it('Debio ser mostrado el modal cuando se llamo el metodo formatFileSize del componente tamanio 800', () => {
      expect(valor1).toEqual('800 B');
    });

    it('Debio ser mostrado el modal cuando se llamo el metodo formatFileSize del componente con tamanio 80000000', () => {
      expect(valor2).toEqual('762.94 MB');
    });
  });
});
