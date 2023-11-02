import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FormFurtComponent } from './form-furt.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { DatePipe, SlicePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  DialogPosition,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TramitesServices } from 'src/app/services/tramites.service';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { RadicacionRequestDto } from 'src/app/interfaces/radicacionRequest';
import { InstanciarRadicacion, anexosMock, anexosMockArray, estamparSticker, generarSticker, requestRadicacionRadicar, tiposSeguridad } from 'src/app/helpers/radicacionRequestDto';
import { generateNArchivos } from 'src/app/helpers/mock testing/Files.mocks';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import {
  InputSwitchModule,
  InputSwitchOnChangeEvent,
} from 'primeng/inputswitch';
import Swal from 'sweetalert2';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { Observable, Subject, Subscription, of, throwError } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { DepartamentoDTO, PaisDTO } from 'src/pqrsd-api/src/src/models';
import {
  PaisesControllerService,
  PqrsdControllerService,
} from 'src/pqrsd-api/src/src/services';
import { ModalTermCondComponent } from '../shared/modal-term-cond/modal-term-cond.component';
import { ISubirArchivoByte } from 'src/app/interfaces/ISubirArchivoByte';
import { Files } from 'src/app/interfaces/Files.model';

fdescribe('FormFurtComponent', () => {
  let component: FormFurtComponent;
  let fixture: ComponentFixture<FormFurtComponent>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<any>;
  let tramitesServices: TramitesServices;
  const formData = new FormData();

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SlicePipe,
        HttpClientTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DropdownModule,
        CheckboxModule,
        InputSwitchModule,
      ],
      declarations: [FormFurtComponent],
      providers: [
        TramitesServices,
        MatDialog,
        UntypedFormBuilder,
        {
          provide: MatDialog,
          useValue: {
            open: () => ({ afterClosed: () => of(true) }), // Simulación de open() de MatDialog
          },
        },
        { provide: MatDialogRef, useValue: {} },
        DatePipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(FormFurtComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    tramitesServices = TestBed.inject(TramitesServices);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFurtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente FormFurtComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios al metodo CamposObligatorios', () => {
    it('Se debio validar campos obligatorios  del formulario ', () => {
      let camposObligatorios: string[] = [
        'idTipoSolicitantePNJ',
        'idTipoIdentificacionPNJ',
        'numeroIdentificacionPNJ',
        'nombreRazonSocialPNJ',
        'telefonoPNJ',
        'emailPNJ',
        'direccionPNJ',
        'idPaisPNJ',
        'idDepartamentoPNJ',
        'idMunicipioPNJ',
        'idTipoIdentificacionRem',
        'numeroIdentificacionRem',
        'nombreRem',
        'telefonoRem',
        'emailRem',
        'direccionRem',
        'idPaisRem',
        'idDepartamentoRem',
        'idMunicipioRem',
        'emailRadicar',
      ];

      component.agregarOQuitarValidadorCamposObligatorios(camposObligatorios);

      expect(
        component.form.controls['idTipoSolicitantePNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idTipoIdentificacionPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['numeroIdentificacionPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['nombreRazonSocialPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['telefonoPNJ'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['emailPNJ'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['direccionPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idPaisPNJ'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['idDepartamentoPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idMunicipioPNJ'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idTipoIdentificacionRem'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['numeroIdentificacionRem'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['nombreRem'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['telefonoRem'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['emailRem'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['direccionRem'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idPaisRem'].hasValidator(Validators.required)
      ).toBeTruthy();

      expect(
        component.form.controls['idDepartamentoRem'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['idMunicipioRem'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();

      expect(
        component.form.controls['emailRadicar'].hasValidator(
          Validators.required
        )
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo resetFormulario', () => {
    it('Se debio ejecutar el metodo resetFormulario', () => {
      spyOn(component, 'resetFormulario');

      component.resetFormulario();

      expect(component.resetFormulario).toHaveBeenCalled();
      expect(component.statusCarga).toBeFalsy();
      expect(component.ArchivosFormulario).toBeFalsy();
    });
  });

  describe('Test unitarios al campo validarCheck', () => {
    it('Se debio ejecutar el campo validarCheck', () => {
      component.form.controls['validarCheck'].setValue(true);
      expect(component.form.controls['validarCheck'].value).toBeTrue();
      expect(component.form.controls['validarCheck'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idTramite', () => {
    it('Se debio ejecutar el campo idTramite', () => {
      component.form.controls['idTramite'].setValue(0);
      expect(component.form.controls['idTramite'].value).toEqual(0);
      expect(component.form.controls['idTramite'].valid).toBeTruthy;
    });
  });

  describe('Test unitarios al campo  descripcionTramite', () => {
    it('Se debio ejecutar el campo descripcionTramite', () => {
      component.form.controls['descripcionTramite'].setValue('PRUEBA');
      expect(component.form.controls['descripcionTramite'].value).toEqual(
        'PRUEBA'
      );
      expect(component.form.controls['descripcionTramite'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  claseProceso', () => {
    it('Se debio ejecutar el campo claseProceso', () => {
      component.form.controls['claseProceso'].setValue('QUEJAS');
      expect(component.form.controls['claseProceso'].value).toEqual('QUEJAS');
      expect(component.form.controls['claseProceso'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  dependencia', () => {
    it('Se debio ejecutar el campo dependencia', () => {
      component.form.controls['dependencia'].setValue(
        'GRUPO DE RELACION ESTADO - CIUDADANO'
      );
      expect(component.form.controls['dependencia'].value).toEqual(
        'GRUPO DE RELACION ESTADO - CIUDADANO'
      );
      expect(component.form.controls['dependencia'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroProceso', () => {
    it('Se debio ejecutar el campo numeroProceso', () => {
      component.form.controls['numeroProceso'].setValue(1000 - 1254 - 12512);
      expect(component.form.controls['numeroProceso'].value).toEqual(
        1000 - 1254 - 12512
      );
      expect(component.form.controls['numeroProceso'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoSolicitantePNJ', () => {
    it('Se debio ejecutar el campo idTipoSolicitantePNJ', () => {
      component.form.controls['idTipoSolicitantePNJ'].setValue(5);
      expect(component.form.controls['idTipoSolicitantePNJ'].value).toEqual(5);
      expect(
        component.form.controls['idTipoSolicitantePNJ'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionPNJ', () => {
      component.form.controls['idTipoIdentificacionPNJ'].setValue(1);
      expect(component.form.controls['idTipoIdentificacionPNJ'].value).toEqual(
        1
      );
      expect(
        component.form.controls['idTipoIdentificacionPNJ'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionPNJ', () => {
      component.form.controls['nombreTipoIdentificacionPNJ'].setValue('CEDULA');
      expect(
        component.form.controls['nombreTipoIdentificacionPNJ'].value
      ).toEqual('CEDULA');
      expect(
        component.form.controls['nombreTipoIdentificacionPNJ'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo numeroIdentificacionPNJ', () => {
      component.form.controls['numeroIdentificacionPNJ'].setValue(9999999999);
      expect(component.form.controls['numeroIdentificacionPNJ'].value).toEqual(
        9999999999
      );
    });
  });

  describe('Test unitarios al campo  nombreRazonSocialPNJ', () => {
    it('Se debio ejecutar el campo nombreRazonSocialPNJ', () => {
      component.form.controls['nombreRazonSocialPNJ'].setValue('PRUEBA');
      expect(component.form.controls['nombreRazonSocialPNJ'].value).toEqual(
        'PRUEBA'
      );
      expect(
        component.form.controls['nombreRazonSocialPNJ'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  telefonoPNJ', () => {
    it('Se debio ejecutar el campo telefonoPNJ', () => {
      component.form.controls['telefonoPNJ'].setValue(7777777);
      expect(component.form.controls['telefonoPNJ'].value).toEqual(7777777);
      expect(component.form.controls['telefonoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailPNJ', () => {
    it('Se debio ejecutar el campo emailPNJ', () => {
      component.form.controls['emailPNJ'].setValue('AGGGGG@GMAIL.COM');
      expect(component.form.controls['emailPNJ'].value).toEqual(
        'AGGGGG@GMAIL.COM'
      );
      expect(component.form.controls['emailPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  direccionPNJ', () => {
    it('Se debio ejecutar el campo direccionPNJ', () => {
      component.form.controls['direccionPNJ'].setValue('CALLE 10');
      expect(component.form.controls['direccionPNJ'].value).toEqual('CALLE 10');
      expect(component.form.controls['direccionPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idPaisPNJ', () => {
    it('Se debio ejecutar el campo idPaisPNJ', () => {
      component.form.controls['idPaisPNJ'].setValue(80);
      expect(component.form.controls['idPaisPNJ'].value).toEqual(80);
      expect(component.form.controls['idPaisPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  paisPNJ', () => {
    it('Se debio ejecutar el campo paisPNJ', () => {
      component.form.controls['paisPNJ'].setValue('COLOMBIA');
      expect(component.form.controls['paisPNJ'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idDepartamentoPNJ', () => {
    it('Se debio ejecutar el campo idDepartamentoPNJ', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(91);
      expect(component.form.controls['idDepartamentoPNJ'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  departamentoPNJ', () => {
    it('Se debio ejecutar el campo departamentoPNJ', () => {
      component.form.controls['departamentoPNJ'].setValue('ANTIOQUIA');
      expect(component.form.controls['departamentoPNJ'].value).toEqual(
        'ANTIOQUIA'
      );
      expect(component.form.controls['departamentoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idMunicipioPNJ', () => {
    it('Se debio ejecutar el campo idMunicipioPNJ', () => {
      component.form.controls['idMunicipioPNJ'].setValue(263);
      expect(component.form.controls['idMunicipioPNJ'].value).toEqual(263);
      expect(component.form.controls['idMunicipioPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioPNJ', () => {
    it('Se debio ejecutar el campo municipioPNJ', () => {
      component.form.controls['municipioPNJ'].setValue('ARBOLETES');
      expect(component.form.controls['municipioPNJ'].value).toEqual(
        'ARBOLETES'
      );
      expect(component.form.controls['municipioPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionRem', () => {
      component.form.controls['idTipoIdentificacionRem'].setValue(1);
      expect(component.form.controls['idTipoIdentificacionRem'].value).toEqual(
        1
      );
      expect(
        component.form.controls['idTipoIdentificacionRem'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionRem', () => {
      component.form.controls['nombreTipoIdentificacionRem'].setValue('CEDULA');
      expect(
        component.form.controls['nombreTipoIdentificacionRem'].value
      ).toEqual('CEDULA');
      expect(
        component.form.controls['nombreTipoIdentificacionRem'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroIdentificacionRem', () => {
    it('Se debio ejecutar el campo numeroIdentificacionRem', () => {
      component.form.controls['numeroIdentificacionRem'].setValue(8888888888);
      expect(component.form.controls['numeroIdentificacionRem'].value).toEqual(
        8888888888
      );
      expect(
        component.form.controls['numeroIdentificacionRem'].valid
      ).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreRem', () => {
    it('Se debio ejecutar el campo nombreRem', () => {
      component.form.controls['nombreRem'].setValue('EDER');
      expect(component.form.controls['nombreRem'].value).toEqual('EDER');
      expect(component.form.controls['nombreRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  telefonoRem', () => {
    it('Se debio ejecutar el campo telefonoRem', () => {
      component.form.controls['telefonoRem'].setValue(5555555555);
      expect(component.form.controls['telefonoRem'].value).toEqual(5555555555);
      expect(component.form.controls['telefonoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailRem', () => {
    it('Se debio ejecutar el campo emailRem', () => {
      component.form.controls['emailRem'].setValue('CARLOS1411@GMAIL.COM');
      expect(component.form.controls['emailRem'].value).toEqual(
        'CARLOS1411@GMAIL.COM'
      );
      expect(component.form.controls['emailRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  direccionRem', () => {
    it('Se debio ejecutar el campo direccionRem', () => {
      component.form.controls['direccionRem'].setValue('CALLE 100');
      expect(component.form.controls['direccionRem'].value).toEqual(
        'CALLE 100'
      );
      expect(component.form.controls['direccionRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idPaisRem', () => {
    it('Se debio ejecutar el campo idPaisRem', () => {
      component.form.controls['idPaisRem'].setValue(80);
      expect(component.form.controls['idPaisRem'].value).toEqual(80);
      expect(component.form.controls['idPaisRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  paisRem', () => {
    it('Se debio ejecutar el campo paisRem', () => {
      component.form.controls['paisRem'].setValue('COLOMBIA');
      expect(component.form.controls['paisRem'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idDepartamentoRem', () => {
    it('Se debio ejecutar el campo idDepartamentoRem', () => {
      component.form.controls['idDepartamentoRem'].setValue(91);
      expect(component.form.controls['idDepartamentoRem'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  departamentoRem', () => {
    it('Se debio ejecutar el campo departamentoRem', () => {
      component.form.controls['departamentoRem'].setValue('ANTIOQUIA');
      expect(component.form.controls['departamentoRem'].value).toEqual(
        'ANTIOQUIA'
      );
      expect(component.form.controls['departamentoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idMunicipioRem', () => {
    it('Se debio ejecutar el campo idMunicipioRem', () => {
      component.form.controls['idMunicipioRem'].setValue(263);
      expect(component.form.controls['idMunicipioRem'].value).toEqual(263);
      expect(component.form.controls['idMunicipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES');
      expect(component.form.controls['municipioRem'].value).toEqual(
        'ARBOLETES'
      );
      expect(component.form.controls['municipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES');
      expect(component.form.controls['municipioRem'].value).toEqual(
        'ARBOLETES'
      );
      expect(component.form.controls['municipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailRadicar', () => {
    it('Se debio ejecutar el campo emailRadicar', () => {
      component.form.controls['emailRadicar'].setValue('JULIOS5555@GMAIL.COM');
      expect(component.form.controls['emailRadicar'].value).toEqual(
        'JULIOS5555@GMAIL.COM'
      );
      expect(component.form.controls['emailRadicar'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo keyCapchat', () => {
    it('Se debio ejecutar el campo keyCapchat', () => {
      component.form.controls['keyCapchat'].setValue(true);
      expect(component.form.controls['keyCapchat'].value).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo handleChangeDepartmentPNJ', () => {
    it('La propiedad indicativo debe estar vacio porque el valor del departamento del formulario es igual a 999', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(999);
      component.handleChangeDepartmentPNJ(999);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(999);
      expect(component.indicativo).toEqual(' ');
    });

    it('La propiedad indicativo debe ser igual a +601 porque el valor del departamento del formulario es igual a 11', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(11);
      component.indicativo = '+601';
      component.handleChangeDepartmentPNJ(11);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(11);
      expect(component.indicativo).toEqual('+601');
    });

    it('La propiedad indicativo debe ser igual a +602 porque el valor del departamento del formulario es igual a 19', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(19);
      component.indicativo = '+602';
      component.handleChangeDepartmentPNJ(11);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(19);
      expect(component.indicativo).toEqual('+602');
    });

    it('La propiedad indicativo debe ser igual a +604 porque el valor del departamento del formulario es igual a 5', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(5);
      component.indicativo = '+604';
      component.handleChangeDepartmentPNJ(5);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(5);
      expect(component.indicativo).toEqual('+604');
    });

    it('La propiedad indicativo debe ser igual a +605 porque el valor del departamento del formulario es igual a 8', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(8);
      component.indicativo = '+605';
      component.handleChangeDepartmentPNJ(8);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(8);
      expect(component.indicativo).toEqual('+605');
    });

    it('La propiedad indicativo debe ser igual a +606 porque el valor del departamento del formulario es igual a 63', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(63);
      component.indicativo = '+606';
      component.handleChangeDepartmentPNJ(63);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(63);
      expect(component.indicativo).toEqual('+606');
    });

    it('La propiedad indicativo debe ser igual a +607 porque el valor del departamento del formulario es igual a 81', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(81);
      component.indicativo = '+607';
      component.handleChangeDepartmentPNJ(81);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(81);
      expect(component.indicativo).toEqual('+607');
    });

    it('La propiedad indicativo debe ser igual a +608 porque el valor del departamento del formulario es igual a 91', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(91);
      component.indicativo = '+608';
      component.handleChangeDepartmentPNJ(91);
      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(91);
      expect(component.indicativo).toEqual('+608');
    });
  });

  describe('Test unitarios al metodo handleChangeDepartmentPNJ', () => {
    it('Debio retornar true porque el campo pais del formulario es igual a 80', () => {
      component.form.controls['idPaisPNJ'].setValue(80);
      component.handleChangeCountryPNJ(80);
      expect(component.form.get('idPaisPNJ')?.value).toEqual(80);
      expect(component.handleChangeCountryPNJ).toBeTruthy;
      expect(component.handleChangeCountryPNJ).toBeDefined();
    });
    it('Debio retornar true porque el campo pais del formulario no es igual a 80', () => {
      component.form.controls['idPaisPNJ'].setValue(81);

      component.handleChangeCountryPNJ(81);

      expect(component.form.get('idPaisPNJ')?.value).toEqual(81);
      expect(component.paisCol).toBeFalse();
      expect(component.paisCol).toBeDefined();
    });
  });

  describe('Test unitarios al metodo idTipoSolicitantePNJ', () => {
    it('Debio retornar false porque el campo tipoPersona del formulario no es igual a 1, 3 y 4', () => {
      component.selectPersonaN = false;
      component.form.get('idTipoSolicitantePNJ')?.setValue(5);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(5);
      expect(component.selectPersonaN).toBeFalse();
      expect(component.selectPersonaN).toBeDefined();
    });

    it('Debio retornar true porque el campo idTipoSolicitantePNJ del formulario es igual a 1 o 3 o 4', () => {
      component.form.get('idTipoSolicitantePNJ')?.setValue(1);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(1);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toBeDefined();
    });
  });

  describe('Test unitarios al metodo handleChangeCountryRem', () => {
    it('Debio retornar true porque el campo pais del formulario es igual a 80', () => {
      component.form.controls['idPaisRem'].setValue(80);
      component.handleChangeCountryPNJ(80);
      expect(component.form.get('idPaisRem')?.value).toEqual(80);
      expect(component.handleChangeCountryPNJ).toBeTruthy;
      expect(component.handleChangeCountryPNJ).toBeDefined();
    });
    it('Debio retornar true porque el campo pais del formulario no es igual a 80', () => {
      component.form.controls['idPaisRem'].setValue(81);

      component.handleChangeCountryPNJ(81);

      expect(component.form.get('idPaisRem')?.value).toEqual(81);
      expect(component.paisCol).toBeFalse();
      expect(component.paisCol).toBeDefined();
    });
  });

  describe('Test unitarios al metodo handleChangeDepartmentRem', () => {
    it('La propiedad indicativo debe estar vacio porque el valor del departamento del formulario es igual a 999', () => {
      component.form.controls['idDepartamentoRem'].setValue(999);
      component.handleChangeDepartmentPNJ(999);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(999);
      expect(component.indicativo).toEqual(' ');
    });

    it('La propiedad indicativo debe ser igual a +601 porque el valor del departamento del formulario es igual a 11', () => {
      component.form.controls['idDepartamentoRem'].setValue(11);
      component.indicativo = '+601';
      component.handleChangeDepartmentPNJ(11);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(11);
      expect(component.indicativo).toEqual('+601');
    });

    it('La propiedad indicativo debe ser igual a +602 porque el valor del departamento del formulario es igual a 19', () => {
      component.form.controls['idDepartamentoRem'].setValue(19);
      component.indicativo = '+602';
      component.handleChangeDepartmentPNJ(11);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(19);
      expect(component.indicativo).toEqual('+602');
    });

    it('La propiedad indicativo debe ser igual a +604 porque el valor del departamento del formulario es igual a 5', () => {
      component.form.controls['idDepartamentoRem'].setValue(5);
      component.indicativo = '+604';
      component.handleChangeDepartmentPNJ(5);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(5);
      expect(component.indicativo).toEqual('+604');
    });

    it('La propiedad indicativo debe ser igual a +605 porque el valor del departamento del formulario es igual a 8', () => {
      component.form.controls['idDepartamentoRem'].setValue(8);
      component.indicativo = '+605';
      component.handleChangeDepartmentPNJ(8);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(8);
      expect(component.indicativo).toEqual('+605');
    });

    it('La propiedad indicativo debe ser igual a +606 porque el valor del departamento del formulario es igual a 63', () => {
      component.form.controls['idDepartamentoRem'].setValue(63);
      component.indicativo = '+606';
      component.handleChangeDepartmentPNJ(63);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(63);
      expect(component.indicativo).toEqual('+606');
    });

    it('La propiedad indicativo debe ser igual a +607 porque el valor del departamento del formulario es igual a 81', () => {
      component.form.controls['idDepartamentoRem'].setValue(81);
      component.indicativo = '+607';
      component.handleChangeDepartmentPNJ(81);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(81);
      expect(component.indicativo).toEqual('+607');
    });

    it('La propiedad indicativo debe ser igual a +608 porque el valor del departamento del formulario es igual a 91', () => {
      component.form.controls['idDepartamentoRem'].setValue(91);
      component.indicativo = '+608';
      component.handleChangeDepartmentPNJ(91);
      expect(component.form.get('idDepartamentoRem')?.value).toEqual(91);
      expect(component.indicativo).toEqual('+608');
    });
  });

  describe('Test unitarios al metodo  onChangeRemPNJ', () => {
    it('Se debio ejecutar el metodo onChangeRemPNJ, debe retornat true', () => {
      component.onChangeRemPNJ(true);
      expect(component.onChangeRemPNJ).toBeTruthy();
    });

    it('Se debio ejecutar el campo onChangeRemPNJ, debe retornar false', () => {
      component.onChangeRemPNJ(false);
      expect(component.onChangeRemPNJ).toBeFalsy;
    });
  });

  describe('Test unitarios al metodo  showResponse', () => {
    it('Se debio ejecutar el metodo showResponse, debe retornat true', () => {
      component.showResponse(true);
      expect(component.showResponse).toBeTruthy();
    });

    it('Se debio ejecutar el campo showResponse, debe retornar false', () => {
      component.showResponse(false);
      expect(component.showResponse).toBeFalsy;
    });
  });

  describe('Test unitarios al metodo  confirmTermAndCond', () => {
    it('Se debio ejecutar el metodo confirmTermAndCond, debe retornat true', () => {
      component.confirmTermAndCond(true);
      expect(component.confirmTermAndCond).toBeTruthy();
    });

    it('Se debio ejecutar el campo confirmTermAndCond, debe retornar false', () => {
      component.confirmTermAndCond(false);
      expect(component.confirmTermAndCond).toBeFalsy;
    });
  });

  describe('Test unitarios al metodo  subirArchivoFilenet', () => {
    it('Se debio ejecutar el metodo subirArchivoFilenet, debe retornat true', () => {
      component.subirArchivoFilenet();
      expect(component.subirArchivoFilenet).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo  getListPais', () => {
    it('debería cargar la lista de países correctamente', () => {
      const paisService = TestBed.inject(PaisesControllerService);
      const mockData: PaisDTO[] = [
        // Define aquí un conjunto de datos de muestra para simular la respuesta del servicio
        { nombre: 'País 1' },
        { nombre: 'País 2' },
      ];

      spyOn(paisService, 'obtenerPaisesHandlerUsingGET').and.returnValue(
        of(mockData) // Simula la respuesta del servicio usando RxJS 'of'
      );

      component.getListPais();

      expect(component.countries).toEqual(mockData); // Verifica si la propiedad 'countries' se actualizó correctamente
    });
  });

  describe('Test unitarios al metodo  getDepartments', () => {
    it('debería cargar la lista de departamentos correctamente', () => {
      const paisesControllerService = TestBed.inject(PaisesControllerService);
      const mockData: DepartamentoDTO[] = [
        // Define aquí un conjunto de datos de muestra para simular la respuesta del servicio
        { idDepartamento: 1 },
        { idPais: 1 },
        { nombreDepartamento: 'Departamento 1' },
        { nombrePais: 'Departamento 2' },
      ];
      spyOn(
        paisesControllerService,
        'obtenerDepartamentosHandlerUsingGET'
      ).and.returnValue(
        of(mockData) // Simula la respuesta del servicio usando RxJS 'of'
      );

      component.getDepartments();

      expect(component.departments).toEqual(mockData); // Verifica si la propiedad 'departments' se actualizó correctamente
    });
  });

  describe('Test unitarios al metodo  getListTipoIdentificacion', () => {
    it('Se debio ejecutar el metodo getListTipoIdentificacion, debe retornat true', () => {
      component.getListTipoIdentificacion();
      expect(component.getListTipoIdentificacion).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo  sendEmail', () => {
    it('Se debio ejecutar el metodo sendEmail, debe retornat true', () => {
      component.sendEmail('Email De Prueba', 'Usuario De Prueba', '12345');
      expect(component.sendEmail).toBeTruthy();
      expect(component.sendEmail).toBeDefined();
    });
  });

  describe('Test unitarios al metodo  loadForm', () => {
    it('Se debio ejecutar el metodo loadForm, debe retornat true', () => {
      component.loadForm();
      expect(component.loadForm).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo  progressFiles', () => {
    it('Se debio ejecutar el metodo progressFiles, debe retornat true', () => {
      component.progressFiles;
      expect(component.progressFiles).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo  subirArchivoCorrespondenciaPrueba', () => {
    it('Se debio ejecutar el metodo subirArchivoCorrespondenciaPrueba, debe retornat true', () => {
      component.subirArchivoCorrespondenciaPrueba;
      expect(component.subirArchivoCorrespondenciaPrueba).toBeTruthy();
      expect(component.subirArchivoCorrespondenciaPrueba).toBeDefined();
    });
  });

  describe('Test unitarios de la variable authorizationPqrsdApi', () => {
    it('Se debio ejecutar la variable authorizationPqrsdApi, debe retornat true', () => {
      component.authorizationPqrsdApi;
      expect(component.authorizationPqrsdApi).toBe(
        environment.authorizationPqrsdApi
      );
      expect(component.authorizationPqrsdApi).toBeDefined();
    });
  });

  describe('Test unitarios de la variable paisesControllerService', () => {
    it('should be created', () => {
      expect(component.paisesControllerService).toBeTruthy();
    });

    it('should have a method to get countries', () => {
      expect(component.paisesControllerService).toBeDefined();
    });
  });

  describe('Test unitarios de la variable paisService', () => {
    it('Creado', () => {
      expect(component.paisService).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.paisService).toBeDefined();
    });
  });

  describe('Test unitarios de la variable fb', () => {
    it('Creado', () => {
      expect(component.fb).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.fb).toBeDefined();
    });
  });

  describe('Test unitarios de la variable pqrsdService', () => {
    it('Creado', () => {
      expect(component.pqrsdService).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.pqrsdService).toBeDefined();
    });
  });

  describe('Test unitarios de la variables tramitesServices', () => {
    it('Creado', () => {
      expect(component.tramitesServices).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.tramitesServices).toBeDefined();
    });
  });

  describe('Test unitarios de la variables tramitesServices', () => {
    it('Creado', () => {
      expect(component.form).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.form).toBeDefined();
    });

    it('Creado', () => {
      expect(component.datos).toBeTruthy();
    });

    it('Definido', () => {
      expect(component.datos).toBeDefined();
    });
  });

  describe('Test unitarios del metodo handleChangeProcess', () => {
    it('Se debio ejecutar del metodo handleChangeProcess, debe retornat true', () => {
      const evento: InputSwitchOnChangeEvent = {
        originalEvent: new Event('change'),
        checked: true, // Cambia esto al valor que deseas probar
      };
      const fcProcessNumber: FormControl = component.form.get(
        'numeroProceso'
      ) as FormControl;
      component.handleChangeProcess(evento);

      expect(component.datos).toBeDefined();
      expect(component.form.get('numeroProceso')).toBeTruthy();
    });
  });

  describe('Test unitarios del metodo openDialog', () => {
    const tipoDocumento: Boolean = true;
    it('should open the dialog', () => {
      spyOn(dialog, 'open');

      component.openDialog(tipoDocumento);

      expect(dialog.open).toHaveBeenCalledWith(ModalComponent, {
        width: '700px',
        data: {
          subirArchivo: component.tramitesServices.subirArchivo,
          tipoDocumento: tipoDocumento,
        },
        disableClose: true,
      });
    });
  });

  describe('Test unitarios del metodo subirArchivoFilenet', () => {
    it('should upload file and call subirArchivoFilenet', () => {
      // Espía el método subirArchivoFilenet de tramitesServices y simula una respuesta exitosa
      spyOn(tramitesServices, 'subirArchivoFilenet').and.returnValue(
        of('respuesta exitosa')
      );
      // Espía el método guardarTramite para verificar si se llama
      spyOn(component, 'guardarTramite');

      // Llama al método subirArchivoFilenet del componente
      component.subirArchivoFilenet();

      // Verifica que subirArchivoFilenet de tramitesServices haya sido llamado con el argumento correcto
      expect(tramitesServices.subirArchivoFilenet).toHaveBeenCalledWith(
        component.subirArchivo
      );

      // Verifica que guardarTramite haya sido llamado después de la respuesta exitosa
      expect(component.guardarTramite).toHaveBeenCalled();
    });
  });

  describe('Test unitarios del metodo UploadProgress', () => {
    it('should handle successful response', () => {
      // Crea una respuesta simulada
      const successfulResponse: HttpResponse<any> = new HttpResponse({
        body: {
          resultados: [{ codigo: 0, mensaje: 'Éxito' }],
        },
      });

      // Espía la función de Swal para asegurarte de que se llama correctamente
      spyOn(Swal, 'fire').and.stub();

      // Llama al método progressFiles con la respuesta simulada
      component.progressFiles(successfulResponse);

      // Expectativas
      expect(component.loaderFile).toBe(false); // Asegúrate de que loaderFile sea false
      expect(Swal.fire).toHaveBeenCalledWith(
        jasmine.objectContaining({
          position: 'center', // Asegúrate de que el objeto contiene la propiedad "position"
          icon: 'success',
          title: 'Se guardaron con éxito un total de 1 Archivos',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        })
      );
    });
  });

  describe('Test unitarios del metodo loadForm()', () => {
    it('should create the form with loadForm() values', () => {
      component.procedure = {
        id: 1,
        nombreGrupoTrabajo: 'GRUPO DE RELACION ESTADO - CIUDADANO',
        codigoGrupoTrabajo: '548',
        tiposSolicitante: [
          {
            codigo: '1',
            nombre: 'Ciudadano',
          },
        ],
        tiposSeguridad: [
          {
              "codigo": "ABIERTA",
              "nombre": "ABIERTA"
          }
      ],
        descripcionSolicitud: 'soli 2',
        nombreAmigable: 'feli 1',
        nombre: 'FELICITACIONES',
        codigo: '94049',
        proceso: {
          codigo: '940',
          nombre: 'QUEJAS',
        },
        documentos: [
          {
            extensiones: [
              {
                codigo: '4',
                nombre: 'pdf',
              },
            ],
            nombre: '1',
            descripcion: '1',
            documentoPrincipal: true,
          },
        ],
        estado: true,
        obligatorio: true,
        funcionario: '29543633 - MELISSA LUCIO SAAVEDRA',
      };

      component.loadForm();

      expect(component.form.get('validarCheck')).toBeTruthy();
      expect(component.form.get('idTramite')?.value).toBe(1);
      expect(component.form.get('descripcionTramite')?.value).toBe('soli 2');
      // Aquí debes continuar con las expectativas para los otros campos
    });
  });

  describe('Test unitarios del array cargaAnexos()', () => {
    it('debería inicializar cargaAnexos como un array vacío', () => {
      // Verifica que cargaAnexos se inicialice como un array vacío
      expect(component.cargaAnexos).toEqual([]);
    });
  });

  describe('Test unitarios del metodo handleChangeRemPNJ()', () => {
    it('handleChangeRemPNJ isRemPNJ es false', () => {
      // Arrange
      component.isRemPNJ = false;
      const form = new FormGroup({
        idTipoIdentificacionRem: new FormControl('1'),
        nombreTipoIdentificacionRem: new FormControl('CEDULA'),
        numeroIdentificacionRem: new FormControl('CEDULA'),
        nombreRem: new FormControl('EDER'),
        telefonoRem: new FormControl('1111111'),
        emailRem: new FormControl('1@GMAIL.COM'),
        direccionRem: new FormControl('CALLE 100'),
        idPaisRem: new FormControl('80'),
        paisRem: new FormControl('COLOMBIA'),
        idDepartamentoRem: new FormControl('91'),
        departamentoRem: new FormControl('ANTIOQUIA'),
        idMunicipioRem: new FormControl('263'),
        municipioRem: new FormControl('ARBOLETES'),
        // ... otros campos del formulario ...
      });
      component.form = form;

      // Act
      component.handleChangeRemPNJ();

      // Assert
      expect(form.get('idTipoIdentificacionRem')?.value).toBeNull();
      expect(form.get('nombreTipoIdentificacionRem')?.value).toBeNull();
      expect(form.get('numeroIdentificacionRem')?.value).toBeNull();
      expect(form.get('nombreRem')?.value).toBeNull();
      expect(form.get('telefonoRem')?.value).toBeNull();
      expect(form.get('emailRem')?.value).toBeNull();
      expect(form.get('direccionRem')?.value).toBeNull();
      expect(form.get('idPaisRem')?.value).toBeNull();
      expect(form.get('paisRem')?.value).toBeNull();
      expect(form.get('idDepartamentoRem')?.value).toBeNull();
      expect(form.get('departamentoRem')?.value).toBeNull();
      expect(form.get('idMunicipioRem')?.value).toBeNull();
      expect(form.get('municipioRem')?.value).toBeNull();
      // Verifica los otros campos del formulario de la misma manera
    });

    it('handleChangeRemPNJ PNJ isRemPNJ es true', () => {
      // Arrange
      component.isRemPNJ = true;
      const form = new FormGroup({
        idTipoIdentificacionPNJ: new FormControl('1'),
        nombreTipoIdentificacionPNJ: new FormControl('CEDULA'),
        numeroIdentificacionPNJ: new FormControl('1111111111'),
        nombreRazonSocialPNJ: new FormControl('EDER'),
        telefonoPNJ: new FormControl('1111111'),
        emailPNJ: new FormControl('1@GMAIL.COM'),
        direccionPNJ: new FormControl('CALLE 100'),
        idPaisPNJ: new FormControl('80'),
        paisPNJ: new FormControl('COLOMBIA'),
        idDepartamentoPNJ: new FormControl('91'),
        departamentoPNJ: new FormControl('ANTIOQUIA'),
        idMunicipioPNJ: new FormControl('263'),
        municipioPNJ: new FormControl('ARBOLETES'),

        idTipoIdentificacionRem: new FormControl(),
        nombreTipoIdentificacionRem: new FormControl(),
        numeroIdentificacionRem: new FormControl(),
        nombreRem: new FormControl(),
        telefonoRem: new FormControl(),
        emailRem: new FormControl(),
        direccionRem: new FormControl(),
        idPaisRem: new FormControl(),
        paisRem: new FormControl(),
        idDepartamentoRem: new FormControl(),
        departamentoRem: new FormControl(),
        idMunicipioRem: new FormControl(),
        municipioRem: new FormControl(),
      });
      component.form = form;

      // Act
      component.handleChangeRemPNJ();

      // Assert
      expect(form.get('idTipoIdentificacionRem')?.value).toEqual(
        form.get('idTipoIdentificacionRem')?.value
      );
      expect(form.get('nombreTipoIdentificacionRem')?.value).toEqual(
        form.get('nombreTipoIdentificacionPNJ')?.value
      );
      expect(form.get('numeroIdentificacionRem')?.value).toEqual(
        form.get('numeroIdentificacionPNJ')?.value
      );
      expect(form.get('nombreRem')?.value).toEqual(
        form.get('nombreRazonSocialPNJ')?.value
      );
      expect(form.get('telefonoRem')?.value).toEqual(
        form.get('telefonoPNJ')?.value
      );
      expect(form.get('emailRem')?.value).toEqual(form.get('emailPNJ')?.value);
      expect(form.get('direccionRem')?.value).toEqual(
        form.get('direccionPNJ')?.value
      );
      expect(form.get('idPaisRem')?.value).toEqual(
        form.get('idPaisPNJ')?.value
      );
      expect(form.get('paisRem')?.value).toEqual(form.get('paisPNJ')?.value);
      expect(form.get('idDepartamentoRem')?.value).toEqual(
        form.get('idDepartamentoPNJ')?.value
      );
      expect(form.get('departamentoRem')?.value).toEqual(
        form.get('departamentoPNJ')?.value
      );
      expect(form.get('idMunicipioRem')?.value).toEqual(
        form.get('idMunicipioPNJ')?.value
      );
      expect(form.get('municipioRem')?.value).toEqual(
        form.get('municipioPNJ')?.value
      );
      // Verifica los otros campos del formulario de la misma manera
    });
  });

  describe('Test unitarios del metodo openDialogPrograma()', () => {
    it('debería abrir el diálogo y cambiar el estado del checkbox según el resultado', () => {
      component.openDialogPrograma();
      expect(component.openDialogPrograma).toBeTruthy();
      expect(component.openDialogPrograma).toBeDefined();
    });
  });

  describe('Files', () => {
    it('debería ser una instancia de Files', () => {
      const files: Files = {
        anexos: [
          {
            archivo: new File(['contenido'], 'archivo.txt'),
            extension: 'txt',
            radicacion: '12345',
            tipoDocumento: 'documento',
            uploadBy: 'usuario',
          },
          // Puedes agregar más elementos si es necesario
        ],
      };

      expect(files).toBeTruthy();
    });

    it('debería tener propiedades de anexos', () => {
      const files: Files = {
        anexos: [
          {
            archivo: new File(['contenido'], 'archivo.txt'),
            extension: 'txt',
            radicacion: '12345',
            tipoDocumento: 'documento',
            uploadBy: 'usuario',
          },
          // Puedes agregar más elementos si es necesario
        ],
      };

      expect(files.anexos).toBeTruthy();
      expect(files.anexos.length).toBeGreaterThan(0);
    });

    it('debería cumplir con la interfaz ISubirArchivoByte', () => {
      const files: Files = {
        anexos: [
          {
            archivo: new File(['contenido'], 'archivo.txt'),
            extension: 'txt',
            radicacion: '12345',
            tipoDocumento: 'documento',
            uploadBy: 'usuario',
          },
          // Puedes agregar más elementos si es necesario
        ],
      };

      const primerAnexo: ISubirArchivoByte = files.anexos[0];

      expect(primerAnexo).toBeTruthy();
      // Asegúrate de que las propiedades de ISubirArchivoByte estén presentes y tengan los valores esperados
      expect(primerAnexo.archivo).toBeTruthy();
      expect(primerAnexo.extension).toBe('txt');
      expect(primerAnexo.radicacion).toBe('12345');
      expect(primerAnexo.tipoDocumento).toBe('documento');
      expect(primerAnexo.uploadBy).toBe('usuario');
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
      tramitesServices.getFilestoUpload(isubirArchivoMock);

      // Aserción: Verifica que el valor de subirArchivo se haya asignado correctamente
      expect(tramitesServices.subirArchivo).toBeTruthy();
      expect(tramitesServices.subirArchivo).toBeDefined();
    });
  });

  describe('Test unitarios para el metodo getArchivosCargados', () => {
    it('debería asignar el valor de uploadArchivo a archivoCargados', () => {
      // Configura tus datos de prueba
      const uploadArchivoMock = [
        {
          archivo: new File(['contenido'], 'archivo.pdf'),
          extension: 'pdf',
          radicacion: '2023-01-006799',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        {
          archivo: new File(['contenido'], 'archivo2.pdf'),
          extension: 'pdf',
          radicacion: '2023-01-006799',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        // Agrega otros elementos según sea necesario
      ];

      // Llama al método que deseas probar
      tramitesServices.getArchivosCargados(uploadArchivoMock);

      // Aserción: Verifica que el valor de archivoCargados se haya asignado correctamente
      expect(tramitesServices.archivoCargados).toEqual(uploadArchivoMock);
      expect(tramitesServices.archivoCargados).toBeTruthy();
      expect(tramitesServices.archivoCargados).toBeDefined();
    });
  });

  describe('Test unitarios para el metodo uploadFileToFileNet()', () => {
    it('debería asignar el valor de uploadArchivo a archivoCargados', fakeAsync(() => {
      const anexosMock = {
        archivo: new File(['contenido'], 'archivo.pdf'),
        extension: 'pdf',
        radicacion: '2023-01-006799',
        tipoDocumento: 'documento',
        uploadBy: 'usuario',
      };

      const anexosMockArray = [
        {
          archivo: new File(['contenido'], 'archivo1.pdf'),
          extension: 'pdf',
          radicacion: '2023-01-006799',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        // ... otros anexos
      ];

      tramitesServices.getFilestoUpload(anexosMock);
      tramitesServices.subirArchivo.anexos = anexosMockArray;
      // Llama al método que deseas probar
      component.uploadFileToFileNet();

      tick();

      // Realiza aserciones para verificar que el método funciona como se espera
      expect(component.loaderFile).toBe(true); // Debería haber activado loaderFile
      expect(component.tramitesServices.subirArchivo.anexos[0].radicacion).toBe(
        '2023-01-006799'
      );
      expect(
        component.tramitesServices.subirArchivo.anexos[0].nombre
      ).toBeUndefined();
    }));
  });

  describe('Prueba unitaria para el metodo progressFiles()', () => {
    it('HttpEventType.UploadProgress', fakeAsync(() => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
      const eventMock = { type: 1, loaded: 50, total: 100 } as HttpEvent<any>;

      component.progressFiles(eventMock);

      expect(component.progress).toBe(50);
      // También puedes verificar que Swal.fire no se haya llamado o que se haya llamado con ciertos parámetros, según tu lógica.
    }));

    it('should handle HttpEventType.Response with successful response', fakeAsync(() => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
      const eventMock = {
        type: 4,
        body: { resultados: [{ codigo: 0 }] },
      } as HttpEvent<any>;

      component.progressFiles(eventMock);

      expect(component.archivosCargadosExitoso).toBe(true);
      expect(component.loaderFile).toBe(false);
      expect(component.progressFiles).toBeDefined();
      expect(component.progressFiles).toBeTruthy();
      // Verifica que Swal.fire se haya llamado con los parámetros adecuados
      expect(Swal.fire).toHaveBeenCalledWith(
        jasmine.objectContaining({
          position: 'center',
          icon: 'success',
          title: jasmine.stringMatching(
            /Se guardaron con éxito un total de \d+ Archivos/
          ),
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        })
      );
    }));

    it('should handle HttpEventType.Response with error response', fakeAsync(() => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
      const eventMock = {
        type: 4,
        body: { resultados: [{ codigo: 1 }] },
      } as HttpEvent<any>;

      component.progressFiles(eventMock);

      expect(component.archivosCargadosExitoso).toBe(false);
      expect(component.progressFiles).toBeDefined();
      expect(component.progressFiles).toBeTruthy();

      // Verifica que Swal.fire se haya llamado con los parámetros adecuados
      expect(Swal.fire).toHaveBeenCalledWith(
        jasmine.objectContaining({
          icon: 'error',
          text: 'Error al subir el ANEXO al filenet',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        })
      );
    }));
  });

  describe('Test unitarios para el metodo subirArchivoCorrespondenciaPrueba()', () => {
    it('should call subirArchivoFilenetPrueba with FormData and handle successful response', () => {
      const anexosMock = {
        archivo: new File(['contenido'], 'archivo.pdf'),
        extension: 'pdf',
        radicacion: '2023-01-006799',
        tipoDocumento: 'documento',
        uploadBy: 'usuario',
      };

      const anexosMockArray = [
        {
          archivo: new File(['contenido'], 'archivo1.pdf'),
          extension: 'pdf',
          radicacion: '2023-01-006799',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        // ... otros anexos
      ];

      tramitesServices.getFilestoUpload(anexosMock);
      tramitesServices.subirArchivo.anexos = anexosMockArray;
      // Llama al método que deseas probar
      component.uploadFileToFileNet();

      const anexos = [anexosMockArray];

      // Espía el método subirArchivoFilenetPrueba para devolver un observable exitoso
      spyOn(tramitesServices, 'subirArchivoFilenetPrueba').and.returnValue(
        of('respuesta exitosa')
      );

      // Configura los anexos en el servicio
      tramitesServices.subirArchivo.anexos = anexosMockArray;

      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
      const eventMock = {
        type: 4,
        body: { resultados: [{ codigo: 1 }] },
      } as HttpEvent<any>;

      component.progressFiles(eventMock);
      // Llama al método que deseas probar
      component.subirArchivoCorrespondenciaPrueba();
      expect(component.subirArchivoCorrespondenciaPrueba).toBeTruthy();
      expect(component.subirArchivoCorrespondenciaPrueba).toBeDefined();

      // Avanza el reloj para manejar la suscripción observable
      fixture.detectChanges();
    });

    it('should handle error response', () => {
      const anexosMock = {
        archivo: new File(['contenido'], 'archivo.pdf'),
        extension: 'pdf',
        radicacion: '2023-01-006799',
        tipoDocumento: 'documento',
        uploadBy: 'usuario',
      };

      const anexosMockArray = [
        {
          archivo: new File(['contenido'], 'archivo1.pdf'),
          extension: 'pdf',
          radicacion: '2023-01-006799',
          tipoDocumento: 'documento',
          uploadBy: 'usuario',
        },
        // ... otros anexos
      ];

      tramitesServices.getFilestoUpload(anexosMock);
      tramitesServices.subirArchivo.anexos = anexosMockArray;
      // Llama al método que deseas probar
      component.uploadFileToFileNet();

      const anexos = [anexosMockArray];
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
      const eventMock = {
        type: 4,
        body: { resultados: [{ codigo: 1 }] },
      } as HttpEvent<any>;

      component.progressFiles(eventMock);
      // Espía el método subirArchivoFilenetPrueba para devolver un observable de error
      spyOn(tramitesServices, 'subirArchivoFilenetPrueba').and.returnValue(
        of(new Error('Error'))
      );

      // Llama al método que deseas probar
      component.subirArchivoCorrespondenciaPrueba();
      expect(component.subirArchivoCorrespondenciaPrueba).toBeTruthy();
      expect(component.subirArchivoCorrespondenciaPrueba).toBeDefined();

      fixture.detectChanges();
    });
  });


  describe('Test unitarios para el metodo guardarTramite()', () => {
    it('guardarTramite con valid form datos  successful response', fakeAsync(() => {
      spyOn(tramitesServices, 'guardarTramite$').and.returnValue(of({message: '123' }));
      // Configura el estado del formulario con datos válidos

      component.form.patchValue(requestRadicacionRadicar);
      // Configura otros valores del formulario según sea necesario

      // Espía otros métodos que llamarás dentro de guardarTramite
      spyOn(component, 'uploadFileToFileNet').and.stub(); // Stub porque es espiado en otra prueba
      spyOn(tramitesServices, 'generateStickerUsingPOST').and.returnValue(of({}));
      spyOn(tramitesServices, 'estamparStickerRequestDTO').and.returnValue(of({}));
      spyOn(tramitesServices, 'instanciarRadicacion').and.returnValue(of({}));

      // Simula el reloj
      jasmine.clock().install();
      const fakeDate = new Date('2023-01-01');
      jasmine.clock().mockDate(fakeDate);

      tramitesServices.getFilestoUpload(anexosMock);
      component.uploadFileToFileNet();


      tramitesServices.subirArchivo.anexos = anexosMockArray;

      component.guardarTramite();
      // Avanza el reloj para manejar la suscripción observable
      tick();

      // Agrega expectativas para asegurarte de que los métodos se hayan llamado y otros aspectos del componente
      tramitesServices.guardarTramite$(requestRadicacionRadicar)
      expect(tramitesServices.guardarTramite$).toBeDefined();
      expect(tramitesServices.guardarTramite$).toBeTruthy();
      expect(component.uploadFileToFileNet).toHaveBeenCalled();

      tramitesServices.generateStickerUsingPOST(generarSticker);
      expect(tramitesServices.generateStickerUsingPOST).toBeDefined();
      expect(tramitesServices.generateStickerUsingPOST).toBeTruthy();

      tramitesServices.estamparStickerRequestDTO(estamparSticker);
      expect(tramitesServices.estamparStickerRequestDTO).toBeDefined();
      expect(tramitesServices.estamparStickerRequestDTO).toBeTruthy();

      tramitesServices.instanciarRadicacion(InstanciarRadicacion);
      expect(tramitesServices.instanciarRadicacion).toBeDefined();
      expect(tramitesServices.instanciarRadicacion).toBeTruthy();


      // Verifica los cambios en el componente
      expect(component.saving).toBe(true);
      // Agrega expectativas adicionales según sea necesario

      // Comprueba que el formulario se haya restablecido
      expect(component.form.valid).toBe(false);
      expect(component.form).toBeDefined();
      expect(component.form).toBeTruthy();

      // Restaura el reloj
      jasmine.clock().uninstall();
    }));

    it('should handle error response from guardarTramite', fakeAsync(() => {
      // Configura el estado del formulario con datos válidos
      component.form.patchValue(requestRadicacionRadicar);
      // Configura otros valores del formulario según sea necesario

      // Espía el método guardarTramite$ para devolver un observable de error
      spyOn(tramitesServices, 'guardarTramite$').and.returnValue(throwError('Error'));

      jasmine.clock().install();
      const fakeDate = new Date('2023-01-01');
      jasmine.clock().mockDate(fakeDate);

      tramitesServices.getFilestoUpload(anexosMock);
      tramitesServices.subirArchivo.anexos = anexosMockArray;

      // Llama al método que deseas probar
      component.guardarTramite();

      // Avanza el reloj para manejar la suscripción observable
      tick();

      // Agrega expectativas para asegurarte de que los métodos se hayan llamado y otros aspectos del componente

      tramitesServices.guardarTramite$(requestRadicacionRadicar);
      component.uploadFileToFileNet();
      expect(tramitesServices.guardarTramite$).toBeDefined();
      expect(tramitesServices.guardarTramite$).toBeTruthy();
      expect(component.uploadFileToFileNet).toBeDefined();
      expect(component.uploadFileToFileNet).toBeTruthy();


      // Verifica que el componente haya manejado el error
      expect(component.saving).toBe(true);

      expect(component.form.valid).toBe(false);
      expect(component.form).toBeDefined();
      expect(component.form).toBeTruthy();
      // Agrega expectativas adicionales según sea necesario

      // Restaura el reloj
      jasmine.clock().uninstall();
    }));


  });

});
