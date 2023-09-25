import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFurtComponent } from './form-furt.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { SlicePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TramitesServices } from 'src/app/services/tramites.service';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { RadicacionRequestDto } from 'src/app/interfaces/radicacionRequest';
import { requestRadicacionRadicar } from 'src/app/helpers/radicacionRequestDto';
import { generateNArchivos } from 'src/app/helpers/mock testing/Files.mocks';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';


fdescribe('FormFurtComponent', () => {
  let component: FormFurtComponent;
  let fixture: ComponentFixture<FormFurtComponent>;


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
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormFurtComponent);
    component = fixture.componentInstance;
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

      expect(component.form.controls['idTipoSolicitantePNJ'].hasValidator(Validators.required)
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
      component.form.controls['validarCheck'].setValue(true)
      expect(component.form.controls['validarCheck'].value).toBeTrue();
      expect(component.form.controls['validarCheck'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idTramite', () => {
    it('Se debio ejecutar el campo idTramite', () => {
      component.form.controls['idTramite'].setValue(0)
      expect(component.form.controls['idTramite'].value).toEqual(0);
      expect(component.form.controls['idTramite'].valid).toBeTruthy;
    });
  });

  describe('Test unitarios al campo  descripcionTramite', () => {
    it('Se debio ejecutar el campo descripcionTramite', () => {
      component.form.controls['descripcionTramite'].setValue('PRUEBA')
      expect(component.form.controls['descripcionTramite'].value).toEqual('PRUEBA');
      expect(component.form.controls['descripcionTramite'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  claseProceso', () => {
    it('Se debio ejecutar el campo claseProceso', () => {
      component.form.controls['claseProceso'].setValue('QUEJAS')
      expect(component.form.controls['claseProceso'].value).toEqual('QUEJAS');
      expect(component.form.controls['claseProceso'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  dependencia', () => {
    it('Se debio ejecutar el campo dependencia', () => {
      component.form.controls['dependencia'].setValue('GRUPO DE RELACION ESTADO - CIUDADANO')
      expect(component.form.controls['dependencia'].value).toEqual('GRUPO DE RELACION ESTADO - CIUDADANO');
      expect(component.form.controls['dependencia'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroProceso', () => {
    it('Se debio ejecutar el campo numeroProceso', () => {
      component.form.controls['numeroProceso'].setValue(1000-1254-12512)
      expect(component.form.controls['numeroProceso'].value).toEqual(1000-1254-12512);
      expect(component.form.controls['numeroProceso'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoSolicitantePNJ', () => {
    it('Se debio ejecutar el campo idTipoSolicitantePNJ', () => {
      component.form.controls['idTipoSolicitantePNJ'].setValue(5)
      expect(component.form.controls['idTipoSolicitantePNJ'].value).toEqual(5);
      expect(component.form.controls['idTipoSolicitantePNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionPNJ', () => {
      component.form.controls['idTipoIdentificacionPNJ'].setValue(1)
      expect(component.form.controls['idTipoIdentificacionPNJ'].value).toEqual(1);
      expect(component.form.controls['idTipoIdentificacionPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionPNJ', () => {
      component.form.controls['nombreTipoIdentificacionPNJ'].setValue('CEDULA')
      expect(component.form.controls['nombreTipoIdentificacionPNJ'].value).toEqual('CEDULA');
      expect(component.form.controls['nombreTipoIdentificacionPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo numeroIdentificacionPNJ', () => {
      component.form.controls['numeroIdentificacionPNJ'].setValue(9999999999)
      expect(component.form.controls['numeroIdentificacionPNJ'].value).toEqual(9999999999);
    });
  });

  describe('Test unitarios al campo  nombreRazonSocialPNJ', () => {
    it('Se debio ejecutar el campo nombreRazonSocialPNJ', () => {
      component.form.controls['nombreRazonSocialPNJ'].setValue('PRUEBA')
      expect(component.form.controls['nombreRazonSocialPNJ'].value).toEqual('PRUEBA');
      expect(component.form.controls['nombreRazonSocialPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  telefonoPNJ', () => {
    it('Se debio ejecutar el campo telefonoPNJ', () => {
      component.form.controls['telefonoPNJ'].setValue(7777777)
      expect(component.form.controls['telefonoPNJ'].value).toEqual(7777777);
      expect(component.form.controls['telefonoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailPNJ', () => {
    it('Se debio ejecutar el campo emailPNJ', () => {
      component.form.controls['emailPNJ'].setValue('AGGGGG@GMAIL.COM')
      expect(component.form.controls['emailPNJ'].value).toEqual('AGGGGG@GMAIL.COM');
      expect(component.form.controls['emailPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  direccionPNJ', () => {
    it('Se debio ejecutar el campo direccionPNJ', () => {
      component.form.controls['direccionPNJ'].setValue('CALLE 10')
      expect(component.form.controls['direccionPNJ'].value).toEqual('CALLE 10');
      expect(component.form.controls['direccionPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idPaisPNJ', () => {
    it('Se debio ejecutar el campo idPaisPNJ', () => {
      component.form.controls['idPaisPNJ'].setValue(80)
      expect(component.form.controls['idPaisPNJ'].value).toEqual(80);
      expect(component.form.controls['idPaisPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  paisPNJ', () => {
    it('Se debio ejecutar el campo paisPNJ', () => {
      component.form.controls['paisPNJ'].setValue('COLOMBIA')
      expect(component.form.controls['paisPNJ'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idDepartamentoPNJ', () => {
    it('Se debio ejecutar el campo idDepartamentoPNJ', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(91)
      expect(component.form.controls['idDepartamentoPNJ'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  departamentoPNJ', () => {
    it('Se debio ejecutar el campo departamentoPNJ', () => {
      component.form.controls['departamentoPNJ'].setValue('ANTIOQUIA')
      expect(component.form.controls['departamentoPNJ'].value).toEqual('ANTIOQUIA');
      expect(component.form.controls['departamentoPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idMunicipioPNJ', () => {
    it('Se debio ejecutar el campo idMunicipioPNJ', () => {
      component.form.controls['idMunicipioPNJ'].setValue(263)
      expect(component.form.controls['idMunicipioPNJ'].value).toEqual(263);
      expect(component.form.controls['idMunicipioPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioPNJ', () => {
    it('Se debio ejecutar el campo municipioPNJ', () => {
      component.form.controls['municipioPNJ'].setValue('ARBOLETES')
      expect(component.form.controls['municipioPNJ'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioPNJ'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionRem', () => {
      component.form.controls['idTipoIdentificacionRem'].setValue(1)
      expect(component.form.controls['idTipoIdentificacionRem'].value).toEqual(1);
      expect(component.form.controls['idTipoIdentificacionRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionRem', () => {
      component.form.controls['nombreTipoIdentificacionRem'].setValue('CEDULA')
      expect(component.form.controls['nombreTipoIdentificacionRem'].value).toEqual('CEDULA');
      expect(component.form.controls['nombreTipoIdentificacionRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  numeroIdentificacionRem', () => {
    it('Se debio ejecutar el campo numeroIdentificacionRem', () => {
      component.form.controls['numeroIdentificacionRem'].setValue(8888888888)
      expect(component.form.controls['numeroIdentificacionRem'].value).toEqual(8888888888);
      expect(component.form.controls['numeroIdentificacionRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  nombreRem', () => {
    it('Se debio ejecutar el campo nombreRem', () => {
      component.form.controls['nombreRem'].setValue('EDER')
      expect(component.form.controls['nombreRem'].value).toEqual('EDER');
      expect(component.form.controls['nombreRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  telefonoRem', () => {
    it('Se debio ejecutar el campo telefonoRem', () => {
      component.form.controls['telefonoRem'].setValue(5555555555)
      expect(component.form.controls['telefonoRem'].value).toEqual(5555555555);
      expect(component.form.controls['telefonoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailRem', () => {
    it('Se debio ejecutar el campo emailRem', () => {
      component.form.controls['emailRem'].setValue('CARLOS1411@GMAIL.COM')
      expect(component.form.controls['emailRem'].value).toEqual('CARLOS1411@GMAIL.COM');
      expect(component.form.controls['emailRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  direccionRem', () => {
    it('Se debio ejecutar el campo direccionRem', () => {
      component.form.controls['direccionRem'].setValue('CALLE 100')
      expect(component.form.controls['direccionRem'].value).toEqual('CALLE 100');
      expect(component.form.controls['direccionRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idPaisRem', () => {
    it('Se debio ejecutar el campo idPaisRem', () => {
      component.form.controls['idPaisRem'].setValue(80)
      expect(component.form.controls['idPaisRem'].value).toEqual(80);
      expect(component.form.controls['idPaisRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  paisRem', () => {
    it('Se debio ejecutar el campo paisRem', () => {
      component.form.controls['paisRem'].setValue('COLOMBIA')
      expect(component.form.controls['paisRem'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idDepartamentoRem', () => {
    it('Se debio ejecutar el campo idDepartamentoRem', () => {
      component.form.controls['idDepartamentoRem'].setValue(91)
      expect(component.form.controls['idDepartamentoRem'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  departamentoRem', () => {
    it('Se debio ejecutar el campo departamentoRem', () => {
      component.form.controls['departamentoRem'].setValue('ANTIOQUIA')
      expect(component.form.controls['departamentoRem'].value).toEqual('ANTIOQUIA');
      expect(component.form.controls['departamentoRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  idMunicipioRem', () => {
    it('Se debio ejecutar el campo idMunicipioRem', () => {
      component.form.controls['idMunicipioRem'].setValue(263)
      expect(component.form.controls['idMunicipioRem'].value).toEqual(263);
      expect(component.form.controls['idMunicipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES')
      expect(component.form.controls['municipioRem'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES')
      expect(component.form.controls['municipioRem'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioRem'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo  emailRadicar', () => {
    it('Se debio ejecutar el campo emailRadicar', () => {
      component.form.controls['emailRadicar'].setValue('JULIOS5555@GMAIL.COM')
      expect(component.form.controls['emailRadicar'].value).toEqual('JULIOS5555@GMAIL.COM');
      expect(component.form.controls['emailRadicar'].valid).toBeTruthy();
    });
  });

  describe('Test unitarios al campo keyCapchat', () => {
    it('Se debio ejecutar el campo keyCapchat', () => {
      component.form.controls['keyCapchat'].setValue(true)
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
      expect(component.handleChangeCountryPNJ).toBeDefined()
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
    it('Se debio ejecutar el metodo getListPais, debe retornat true', () => {
      component.getListPais();
      expect(component.getListPais).toBeTruthy();
    });
  });

  describe('Test unitarios al metodo  getDepartments', () => {
    it('Se debio ejecutar el metodo getDepartments, debe retornat true', () => {
      component.getDepartments();
      expect(component.getDepartments).toBeTruthy();
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
    });
  });


  describe('Test unitarios de la variable authorizationPqrsdApi', () => {
    it('Se debio ejecutar la variable authorizationPqrsdApi, debe retornat true', () => {
      component.authorizationPqrsdApi;
      expect(component.authorizationPqrsdApi).toBe(environment.authorizationPqrsdApi);
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

});
