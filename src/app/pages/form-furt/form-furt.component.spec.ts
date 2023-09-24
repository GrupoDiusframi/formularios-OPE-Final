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





  describe('Test unitarios al campo keyCapchat', () => {
    it('Se debio ejecutar el campo keyCapchat', () => {
      component.form.controls['keyCapchat'].setValue(true)
      expect(component.form.controls['keyCapchat'].value).toBeTrue();
    });
  });

  describe('Test unitarios al campo  nombreTipoIdentificacionPNJ', () => {
    it('Se debio ejecutar el campo nombreTipoIdentificacionPNJ', () => {
      component.form.controls['nombreTipoIdentificacionPNJ'].setValue('CEDULA')
      expect(component.form.controls['nombreTipoIdentificacionPNJ'].value).toEqual('CEDULA');
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

  describe('Test unitarios al metodo resetFormulario', () => {
    it('Se debio ejecutar el metodo resetFormulario', () => {
      spyOn(component, 'resetFormulario');

      component.resetFormulario();

      expect(component.resetFormulario).toHaveBeenCalled();
      expect(component.statusCarga).toBeFalsy();
      expect(component.ArchivosFormulario).toBeFalsy();
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
