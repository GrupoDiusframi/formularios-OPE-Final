import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TramitesServices } from "./tramites.service";
import { TestBed } from "@angular/core/testing";
import { PqrsdControllerService } from "src/pqrsd-api/src/src/services";
import { requestRadicacionRadicar } from "../helpers/radicacionRequestDto";

fdescribe('Suit de test unitarios para el servicio PqrsdService', () => {
  let service: TramitesServices;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TramitesServices, PqrsdControllerService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TramitesServices)
  });

  it('Debio ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });


  describe('Test unitarios para el metodo getArchivosCargados', () => {

    it('Se debio actualizar el valor de la variable archivoCargados', () => {
      const mockUploadArchivo: any[] = [];
      spyOn(service, 'getArchivosCargados');

      service.getArchivosCargados(mockUploadArchivo);

      expect(service.archivoCargados).toBeTruthy();
      expect(service.getArchivosCargados).toHaveBeenCalled();
      expect(service.archivoCargados.length).toEqual(0);
    });
  });

/*

  describe('Test unitarios para el metodo subirArchivoFilenet', () => {
    it('Debio retornar true porque se subio el archivo correctamente', (doneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
      const mocks = {
        archivo: '',
        extension: '',
        radicacion: '',
        tipoDocumento: '',
        uploadBy: '',
        nombre: '',
      };

      service.subirArchivoFilenet(mocks).subscribe({
        next: (response) => {
          expect(response).toEqual(mocks);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.correspondenciaPrueba}filenet/api/v1/archivoSubir`;
      const request = httpTestingController.expectOne(url);

      request.flush(mocks);
    });
  });

*/

  describe('Test unitarios para el metodo enviarEmail', () => {
    it('Debio retornar true porque se envio correctamente el correo Electronico', (doneFn) => {
      const correo = 'danny@gmail.com';
      const nombre = 'danny';

      const numeroRadicado = '2023-01-001574';
      service.enviarEmail(correo,nombre,numeroRadicado).subscribe({
        next: (response) => {
          expect(response).toEqual(correo);
          doneFn();
        },
      });
      // Http config
      const url: string = `${service.URLBACKEND}send-email`;
      const request = httpTestingController.expectOne(url);
      request.flush(correo);
    });
  });

  describe('Test unitarios para el metodo getFilestoUpload', () => {
    it('debería asignar el valor de isubirArchivo a subirArchivo', () => {
      // Configura tus datos de prueba
      const isubirArchivoMock = {
        archivo: new File(['contenido'], 'archivo.pdf'),
        extension: 'pdf',
        radicacion: '12345',
        tipoDocumento: 'documento',
        uploadBy: 'usuario',
      };

      // Llama al método que deseas probar
      service.getFilestoUpload(isubirArchivoMock);

      // Aserción: Verifica que el valor de subirArchivo se haya asignado correctamente
      expect(service.subirArchivo).toBeTruthy();
      expect(service.subirArchivo).toBeDefined();
    });
  });

  describe('Test unitarios para el metodo getArchivosCargados', () => {

    it('debería asignar el valor de uploadArchivo a archivoCargados', () => {
      // Configura tus datos de prueba
      const uploadArchivoMock = [
         {
          archivo: new File(['contenido'], 'archivo.pdf'),
          extension: 'pdf',
          radicacion: '123456',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        {
          archivo: new File(['contenido'], 'archivo2.pdf'),
          extension: 'pdf',
          radicacion: '1234567',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        // Agrega otros elementos según sea necesario
      ];

      // Llama al método que deseas probar
      service.getArchivosCargados(uploadArchivoMock);

      // Aserción: Verifica que el valor de archivoCargados se haya asignado correctamente
      expect(service.archivoCargados).toEqual(uploadArchivoMock);
      expect(service.archivoCargados).toBeTruthy();
      expect(service.archivoCargados).toBeDefined();
    });
  });

/*
    describe('Test unitarios para el metodo generateToken', () => {
      it('Debio retornar true porque se envio correctamente el generateToken', obj => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
      service.generateToken();
      expect(service.generateToken).toBeTruthy();
    });
    });



    describe('Test unitarios para el metodo listaTramites$()', () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
      it('Debio retornar true porque se envio correctamente el listaTramites$()', obj => {
      service.listaTramites$();
      expect(service.listaTramites$).toBeTruthy();
    });
    });


    describe('Test unitarios para el metodo guardarTramite$', () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
      it('Debio retornar true porque se envio correctamente el guardarTramite$', obj => {
      service.guardarTramite$(requestRadicacionRadicar);
      expect(service.guardarTramite$).toBeTruthy();
    });
    });
*/

});
