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
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';



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
      expect(component.form.controls['idTramite'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  descripcionTramite', () => {
    it('Se debio ejecutar el campo descripcionTramite', () => {
      component.form.controls['descripcionTramite'].setValue('PRUEBA')
      expect(component.form.controls['descripcionTramite'].value).toEqual('PRUEBA');
      expect(component.form.controls['descripcionTramite'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  claseProceso', () => {
    it('Se debio ejecutar el campo claseProceso', () => {
      component.form.controls['claseProceso'].setValue('QUEJAS')
      expect(component.form.controls['claseProceso'].value).toEqual('QUEJAS');
      expect(component.form.controls['claseProceso'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  dependencia', () => {
    it('Se debio ejecutar el campo dependencia', () => {
      component.form.controls['dependencia'].setValue('GRUPO DE RELACION ESTADO - CIUDADANO')
      expect(component.form.controls['dependencia'].value).toEqual('GRUPO DE RELACION ESTADO - CIUDADANO');
      expect(component.form.controls['dependencia'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  numeroProceso', () => {
    it('Se debio ejecutar el campo numeroProceso', () => {
      component.form.controls['numeroProceso'].setValue(1000-1254-12512)
      expect(component.form.controls['numeroProceso'].value).toEqual(1000-1254-12512);
      expect(component.form.controls['numeroProceso'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idTipoSolicitantePNJ', () => {
    it('Se debio ejecutar el campo idTipoSolicitantePNJ', () => {
      component.form.controls['idTipoSolicitantePNJ'].setValue(5)
      expect(component.form.controls['idTipoSolicitantePNJ'].value).toEqual(5);
      expect(component.form.controls['idTipoSolicitantePNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionPNJ', () => {
      component.form.controls['idTipoIdentificacionPNJ'].setValue(1)
      expect(component.form.controls['idTipoIdentificacionPNJ'].value).toEqual(1);
      expect(component.form.controls['idTipoIdentificacionPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionPNJ', () => {
      component.form.controls['nombreTipoIdentificacionPNJ'].setValue('CEDULA')
      expect(component.form.controls['nombreTipoIdentificacionPNJ'].value).toEqual('CEDULA');
      expect(component.form.controls['nombreTipoIdentificacionPNJ'].valid).toBeTrue();
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
      expect(component.form.controls['nombreRazonSocialPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  telefonoPNJ', () => {
    it('Se debio ejecutar el campo telefonoPNJ', () => {
      component.form.controls['telefonoPNJ'].setValue(7777777)
      expect(component.form.controls['telefonoPNJ'].value).toEqual(7777777);
      expect(component.form.controls['telefonoPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  emailPNJ', () => {
    it('Se debio ejecutar el campo emailPNJ', () => {
      component.form.controls['emailPNJ'].setValue('AGGGGG@GMAIL.COM')
      expect(component.form.controls['emailPNJ'].value).toEqual('AGGGGG@GMAIL.COM');
      expect(component.form.controls['emailPNJ'].valid).toBeTrue();
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
      expect(component.form.controls['idPaisPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  paisPNJ', () => {
    it('Se debio ejecutar el campo paisPNJ', () => {
      component.form.controls['paisPNJ'].setValue('COLOMBIA')
      expect(component.form.controls['paisPNJ'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idDepartamentoPNJ', () => {
    it('Se debio ejecutar el campo idDepartamentoPNJ', () => {
      component.form.controls['idDepartamentoPNJ'].setValue(91)
      expect(component.form.controls['idDepartamentoPNJ'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  departamentoPNJ', () => {
    it('Se debio ejecutar el campo departamentoPNJ', () => {
      component.form.controls['departamentoPNJ'].setValue('ANTIOQUIA')
      expect(component.form.controls['departamentoPNJ'].value).toEqual('ANTIOQUIA');
      expect(component.form.controls['departamentoPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idMunicipioPNJ', () => {
    it('Se debio ejecutar el campo idMunicipioPNJ', () => {
      component.form.controls['idMunicipioPNJ'].setValue(263)
      expect(component.form.controls['idMunicipioPNJ'].value).toEqual(263);
      expect(component.form.controls['idMunicipioPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  municipioPNJ', () => {
    it('Se debio ejecutar el campo municipioPNJ', () => {
      component.form.controls['municipioPNJ'].setValue('ARBOLETES')
      expect(component.form.controls['municipioPNJ'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioPNJ'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo idTipoIdentificacionRem', () => {
      component.form.controls['idTipoIdentificacionRem'].setValue(1)
      expect(component.form.controls['idTipoIdentificacionRem'].value).toEqual(1);
      expect(component.form.controls['idTipoIdentificacionRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionRem', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionRem', () => {
      component.form.controls['nombreTipoIdentificacionRem'].setValue('CEDULA')
      expect(component.form.controls['nombreTipoIdentificacionRem'].value).toEqual('CEDULA');
      expect(component.form.controls['nombreTipoIdentificacionRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  numeroIdentificacionRem', () => {
    it('Se debio ejecutar el campo numeroIdentificacionRem', () => {
      component.form.controls['numeroIdentificacionRem'].setValue(8888888888)
      expect(component.form.controls['numeroIdentificacionRem'].value).toEqual(8888888888);
      expect(component.form.controls['numeroIdentificacionRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  nombreRem', () => {
    it('Se debio ejecutar el campo nombreRem', () => {
      component.form.controls['nombreRem'].setValue('EDER')
      expect(component.form.controls['nombreRem'].value).toEqual('EDER');
      expect(component.form.controls['nombreRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  telefonoRem', () => {
    it('Se debio ejecutar el campo telefonoRem', () => {
      component.form.controls['telefonoRem'].setValue(5555555555)
      expect(component.form.controls['telefonoRem'].value).toEqual(5555555555);
      expect(component.form.controls['telefonoRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  emailRem', () => {
    it('Se debio ejecutar el campo emailRem', () => {
      component.form.controls['emailRem'].setValue('CARLOS1411@GMAIL.COM')
      expect(component.form.controls['emailRem'].value).toEqual('CARLOS1411@GMAIL.COM');
      expect(component.form.controls['emailRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  direccionRem', () => {
    it('Se debio ejecutar el campo direccionRem', () => {
      component.form.controls['direccionRem'].setValue('CALLE 100')
      expect(component.form.controls['direccionRem'].value).toEqual('CALLE 100');
      expect(component.form.controls['direccionRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idPaisRem', () => {
    it('Se debio ejecutar el campo idPaisRem', () => {
      component.form.controls['idPaisRem'].setValue(80)
      expect(component.form.controls['idPaisRem'].value).toEqual(80);
      expect(component.form.controls['idPaisRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  paisRem', () => {
    it('Se debio ejecutar el campo paisRem', () => {
      component.form.controls['paisRem'].setValue('COLOMBIA')
      expect(component.form.controls['paisRem'].value).toEqual('COLOMBIA');
      expect(component.form.controls['paisRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idDepartamentoRem', () => {
    it('Se debio ejecutar el campo idDepartamentoRem', () => {
      component.form.controls['idDepartamentoRem'].setValue(91)
      expect(component.form.controls['idDepartamentoRem'].value).toEqual(91);
      expect(component.form.controls['idDepartamentoRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  departamentoRem', () => {
    it('Se debio ejecutar el campo departamentoRem', () => {
      component.form.controls['departamentoRem'].setValue('ANTIOQUIA')
      expect(component.form.controls['departamentoRem'].value).toEqual('ANTIOQUIA');
      expect(component.form.controls['departamentoRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  idMunicipioRem', () => {
    it('Se debio ejecutar el campo idMunicipioRem', () => {
      component.form.controls['idMunicipioRem'].setValue(263)
      expect(component.form.controls['idMunicipioRem'].value).toEqual(263);
      expect(component.form.controls['idMunicipioRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES')
      expect(component.form.controls['municipioRem'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  municipioRem', () => {
    it('Se debio ejecutar el campo municipioRem', () => {
      component.form.controls['municipioRem'].setValue('ARBOLETES')
      expect(component.form.controls['municipioRem'].value).toEqual('ARBOLETES');
      expect(component.form.controls['municipioRem'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo  emailRadicar', () => {
    it('Se debio ejecutar el campo emailRadicar', () => {
      component.form.controls['emailRadicar'].setValue('JULIOS5555@GMAIL.COM')
      expect(component.form.controls['emailRadicar'].value).toEqual('JULIOS5555@GMAIL.COM');
      expect(component.form.controls['emailRadicar'].valid).toBeTrue();
    });
  });

  describe('Test unitarios al campo keyCapchat', () => {
    it('Se debio ejecutar el campo keyCapchat', () => {
      component.form.controls['keyCapchat'].setValue(true)
      expect(component.form.controls['keyCapchat'].value).toBeTrue();
    });
  });

  describe('Test unitarios al metodo nombreDepartamento', () => {
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
    });
    it('Debio retornar true porque el campo pais del formulario no es igual a 80', () => {
      component.form.controls['idPaisPNJ'].setValue(81);

      component.handleChangeCountryPNJ(81);

      expect(component.form.get('idPaisPNJ')?.value).toEqual(81);
      expect(component.paisCol).toBeFalse();
    });
  });

  describe('Test unitarios al metodo idTipoSolicitantePNJ', () => {
    it('Debio retornar false porque el campo tipoPersona del formulario no es igual a 1, 3 y 4', () => {
      component.selectPersonaN = false;
      component.form.get('idTipoSolicitantePNJ')?.setValue(5);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(5);
      expect(component.selectPersonaN).toBeFalse();
    });

    it('Debio retornar true porque el campo idTipoSolicitantePNJ del formulario es igual a 1 o 3 o 4', () => {
      component.form.get('idTipoSolicitantePNJ')?.setValue(1);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(1);
    });
  });


  /*

  describe('Test unitarios al metodo requestRadicacion', () => {
    it('Se debio ejecutar el metodo requestRadicacion ', () => {

      component.form.controls['anexosFisicos'].setValue(12);
      component.form.controls['aplicaCiudadCodigo'].setValue(263);
      component.form.controls['aplicaDepartamentoCodigo'].setValue(91);
      component.form.controls['aplicaPaisCodigo'].setValue(80);
      component.form.controls['aplicaEmail'].setValue('casarrubia@gmail.com');
      component.form.controls['aplicaDireccion'].setValue('CALLE 100');
      component.form.controls['aplicaNombre'].setValue('EDER');
      component.form.controls['aplicaTelefono'].setValue(1111111111);
      component.form.controls['aplicaIdentificacion'].setValue(1111111111);
      component.form.controls['aplicaTipoIdentificacionId'].setValue(1);

      component.form.controls['aplicaTipoIdentificacionNombre'].setValue('CÉDULA');
      component.form.controls['particularIdentificacion'].setValue('1111111111');
      component.form.controls['particularNombre'].setValue('EDER');
      component.form.controls['particularTipoIdentificacionId'].setValue(1);
      component.form.controls['particularTipoIdentificacionNombre'].setValue('CÉDULA');
      component.form.controls['particularCiudadCodigo'].setValue(263);
      component.form.controls['particularDepartamentoCodigo'].setValue(91);
      component.form.controls['particularPaisCodigo'].setValue(80);
      component.form.controls['particularDireccion'].setValue('CALLE 100');
      component.form.controls['particularTelefono'].setValue(1111111111);

      component.form.controls['particularEmail'].setValue('casarrubia@gmail.com');
      component.form.controls['dependenciaId'].setValue(547);
      component.form.controls['dependenciaNombre'].setValue('GRUPO DE GESTION DOCUMENTAL');
      component.form.controls['entregaFisica'].setValue(false);
      component.form.controls['foliosNumero'].setValue(1);
      component.form.controls['referenciaExterna'].setValue('PRUEBA SWITCH');
      component.form.controls['cuadernoTipoId'].setValue(0);
      component.form.controls['cuadernoCodigo'].setValue(0);
      component.form.controls['documentalTipoId'].setValue(0);
      component.form.controls['documentalTipoCodigo'].setValue('0');

      component.form.controls['tramiteId'].setValue(0);
      component.form.controls['tramiteCodigo'].setValue(29001);
      component.form.controls['extensionArchivo'].setValue('.pdf');
      component.form.controls['codigoMedioEnvio'].setValue(5);
      component.form.controls['codigoTipoSeguridad'].setValue('ABIERTA');
      component.form.controls['codigoSerie'].setValue(0);
      component.form.controls['codigoSubSerie'].setValue(0);
      component.form.controls['loginUsuario'].setValue('aplicaciones');
      component.form.controls['radicacionAnterior'].setValue('2023-07-000904');
      component.form.controls['nombreSerie'].setValue('TODAS');
      component.form.controls['nombreSubSerie'].setValue('TODAS');
      component.guardarTramite();
      expect(requestRadicacionRadicar.anexosFisicos).toEqual(12);
      expect( requestRadicacionRadicar.aplicaCiudadCodigo).toEqual(263);
      expect(requestRadicacionRadicar.aplicaDepartamentoCodigo).toEqual(91);
      expect(requestRadicacionRadicar.aplicaPaisCodigo).toEqual(80);
      expect(requestRadicacionRadicar.aplicaEmail).toEqual('casarrubia@gmail.com');
      expect(requestRadicacionRadicar.aplicaDireccion).toEqual('CALLE 100');
      expect(requestRadicacionRadicar.aplicaNombre).toEqual('EDER');
      expect(requestRadicacionRadicar.aplicaTelefono).toEqual(1111111111);
      expect(requestRadicacionRadicar.aplicaIdentificacion).toEqual(1111111111);
      expect(requestRadicacionRadicar.aplicaTipoIdentificacionId).toEqual(1);

      expect(requestRadicacionRadicar.aplicaTipoIdentificacionNombre).toEqual('CÉDULA');
      expect( requestRadicacionRadicar.particularIdentificacion).toEqual(1111111111);
      expect(requestRadicacionRadicar.particularNombre).toEqual('EDER');
      expect(requestRadicacionRadicar.particularTipoIdentificacionId).toEqual(1);
      expect(requestRadicacionRadicar.particularTipoIdentificacionNombre).toEqual('CÉDULA');
      expect(requestRadicacionRadicar.particularCiudadCodigo).toEqual(263);
      expect(requestRadicacionRadicar.particularDepartamentoCodigo).toEqual(91);
      expect(requestRadicacionRadicar.particularPaisCodigo).toEqual(80);
      expect(requestRadicacionRadicar.particularDireccion).toEqual('CALLE 100');
      expect(requestRadicacionRadicar.particularTelefono).toEqual(1111111111);

      expect(requestRadicacionRadicar.particularEmail).toEqual('casarrubia@gmail.com');
      expect( requestRadicacionRadicar.dependenciaId).toEqual(547);
      expect(requestRadicacionRadicar.dependenciaNombre).toEqual('GRUPO DE GESTION DOCUMENTAL');
      expect(requestRadicacionRadicar.entregaFisica).toEqual(false);
      expect(requestRadicacionRadicar.foliosNumero).toEqual(1);
      expect(requestRadicacionRadicar.referenciaExterna).toEqual('PRUEBA SWITCH');
      expect(requestRadicacionRadicar.cuadernoTipoId).toEqual(0);
      expect(requestRadicacionRadicar.cuadernoCodigo).toEqual(0);
      expect(requestRadicacionRadicar.documentalTipoId).toEqual(0);
      expect(requestRadicacionRadicar.documentalTipoCodigo).toEqual('0');

      expect(requestRadicacionRadicar.tramiteId).toEqual(0);
      expect( requestRadicacionRadicar.tramiteCodigo).toEqual(29001);
      expect(requestRadicacionRadicar.extensionArchivo).toEqual('.pdf');
      expect(requestRadicacionRadicar.codigoMedioEnvio).toEqual(5);
      expect(requestRadicacionRadicar.codigoTipoSeguridad).toEqual('ABIERTA');
      expect(requestRadicacionRadicar.codigoSerie).toEqual(0);
      expect(requestRadicacionRadicar.codigoSubSerie).toEqual(0);
      expect(requestRadicacionRadicar.loginUsuario).toEqual('aplicaciones');
      expect(requestRadicacionRadicar.radicacionAnterior).toEqual('2023-07-000904');
      expect(requestRadicacionRadicar.nombreSerie).toEqual('TODAS');
      expect(requestRadicacionRadicar.nombreSubSerie).toEqual('TODAS');
    });
  });

  describe('Test unitarios al metodo handleChangeCountryPNJ', () => {
    it('Debio retornar true porque el campo idPaisPNJ del formulario es igual a 80', () => {
      component.form.patchValue({
        pais: 80,
      });

      expect(component.form.get('idPaisPNJ')?.value).toEqual(80);
      component.handleChangeCountryPNJ(80);

      expect(component.paisCol).toBeTrue();
      expect(component.seleccionInicial).toBeFalse();
    });

    it('Debio retornar true porque el atributo paisCol es false', () => {
      expect(component.seleccionInicial).toBeFalse();

      component.seleccionInicial = true;
      component.handleChangeCountryPNJ(80);

      expect(component.paisCol).toBeTrue();
      expect(component.seleccionInicial).toBeTrue();
    });

    it('Debio retornar true porque el campo pais del formulario no es igual a 80', () => {
      component.form.patchValue({
        pais: 81,
      });

      component.handleChangeCountryPNJ(80);
      expect(component.form.get('pais')?.value).toEqual(81);
      expect(component.paisCol).toBeFalse();
    });
  });

  describe('Test unitarios al metodo guardarTramite', () => {
    it('Se debio ejecutar el metodo guardarTramite y el loader debe estar en false', () => {
      component.guardarTramite();
      expect(component.loader).toBeFalse();
    });
  });




  describe('Test unitarios al metodo nombreDepartamento', () => {
    it('La propiedad indicativo debe estar vacio porque el valor del departamento del formulario es igual a 999', () => {
      component.form.patchValue({
        departamento: 999,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(999);
      expect(component.indicativo).toEqual(' ');
    });

    it('La propiedad indicativo debe ser igual a +601 porque el valor del departamento del formulario es igual a 11', () => {
      component.form.patchValue({
        departamento: 11,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(11);
      expect(component.indicativo).toEqual('+601');
    });

    it('La propiedad indicativo debe ser igual a +602 porque el valor del departamento del formulario es igual a 19', () => {
      component.form.patchValue({
        departamento: 19,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(19);
      expect(component.indicativo).toEqual('+602');
    });

    it('La propiedad indicativo debe ser igual a +604 porque el valor del departamento del formulario es igual a 5', () => {
      component.form.patchValue({
        departamento: 5,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(5);
      expect(component.indicativo).toEqual('+604');
    });

    it('La propiedad indicativo debe ser igual a +605 porque el valor del departamento del formulario es igual a 8', () => {
      component.form.patchValue({
        departamento: 8,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(8);
      expect(component.indicativo).toEqual('+605');
    });

    it('La propiedad indicativo debe ser igual a +606 porque el valor del departamento del formulario es igual a 63', () => {
      component.form.patchValue({
        departamento: 63,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(63);
      expect(component.indicativo).toEqual('+606');
    });

    it('La propiedad indicativo debe ser igual a +607 porque el valor del departamento del formulario es igual a 81', () => {
      component.form.patchValue({
        departamento: 81,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(81);
      expect(component.indicativo).toEqual('+607');
    });

    it('La propiedad indicativo debe ser igual a +608 porque el valor del departamento del formulario es igual a 91', () => {
      component.form.patchValue({
        departamento: 91,
      });

      component.handleChangeDepartmentPNJ(91);

      expect(component.form.get('idDepartamentoPNJ')?.value).toEqual(91);
      expect(component.indicativo).toEqual('+608');
    });
  });

  describe('Test unitarios al metodo personaNatural', () => {
    it('Debio retornar false porque el campo tipoPersona del formulario no es igual a 1, 3 y 4', () => {
      component.form.patchValue({
        tipoPersona: 5,
      });

      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(5);
      expect(component.selectPersonaN).toBeFalse();
    });

    it('Debio retornar true porque el campo tipoPersona del formulario es igual a 1 o 3 o 4', () => {
      component.form.patchValue({
        tipoPersona: 1,
      });

      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual(1);
      expect(component.form.get('idTipoSolicitantePNJ')?.value).toEqual('');
      expect(component.selectPersonaN).toBeTrue();
    });
  });

  */
});
