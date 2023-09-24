
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// PRIMENG
import {
  InputSwitchOnChangeEvent,
} from 'primeng/inputswitch';

import { NaturalLegalPersonService } from 'src/app/services/natural-legal-person.service';
import { Observable, Subject, Subscription, take, timer } from 'rxjs';
import {
  NaturalLegalPersonBody,
  TipoIdentificacion,
  WithoutResponseBody,
} from 'src/app/interfaces/natural-legal-person';

import { Tramites } from 'src/app/interfaces/tramites';
import { TipoSolicitante } from 'src/app/interfaces/tipo-solicitante';
import { RadicacionRequestDto } from 'src/app/interfaces/radicacionRequest';
import { TramitesServices } from 'src/app/services/tramites.service';
import { ISubirArchivo } from 'src/app/interfaces/ISubirArchivo';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PaisesControllerService, PqrsdControllerService } from 'src/pqrsd-api/src/src/services';
import { environment } from 'src/environments/environment';
import { CiudadDTO, DepartamentoDTO, PaisDTO } from 'src/pqrsd-api/src/src/models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-furt',
  templateUrl: './form-furt.component.html',
  styleUrls: ['./form-furt.component.scss'],
})
export class FormFurtComponent implements OnInit, OnDestroy {
  private readonly authorizationPqrsdApi = environment.authorizationPqrsdApi;
  private paisesControllerService: PaisesControllerService = inject(
    PaisesControllerService
  );
  private paisService = inject(PaisesControllerService);
  private naturalLegalPersonService: NaturalLegalPersonService = inject(
    NaturalLegalPersonService
  );
  private fb: FormBuilder = inject(FormBuilder);
  private pqrsdService = inject(PqrsdControllerService);
  private tramitesServices = inject(TramitesServices);

  private destroy$ = new Subject<void>();
  loaderFile!: boolean;
  @Input() procedure!: Tramites;
  cantidadArchivoss!: number;
  loader!: boolean;
  numeroTramite!: string;
  readonly processNumberRegex: RegExp = /[0-9]{4}-[0-9]{3}-[0-9]{3}$/;

  form!: FormGroup;
  datos: Array<Tramites> = [];
  tipoSolicitante: Array<TipoSolicitante> = [];
  isExistProcess: FormControl<boolean> = new FormControl();

  confirmTermCond!: boolean;
  isCaptchaResolved!: boolean;
  isReadonly!: boolean;
  isRemPNJ!: boolean;
  token: string = '';

  countries!: Array<PaisDTO>;
  departments!: Array<DepartamentoDTO>;

  departmentsPNJ!: Array<DepartamentoDTO>;
  municipalitiesPNJ!: Array<CiudadDTO>;
  departmentsRem!: Array<DepartamentoDTO>;
  municipalitiesRem!: Array<CiudadDTO>;
  documents: Array<any> = [];
  uploadedFiles: Array<{ [key: string]: File }> = [];
  tiposIdentificacion!: Array<TipoIdentificacion>;
  ArchivosFormulario: any;
  limpiarArchivos: any[] = [];
  statusCarga: boolean = false;
  seleccionInicial: boolean = false;
  paisCol: boolean = false;
  selectPersonaN: boolean = false;
  indicativo: string = ' ';


  subirArchivo: ISubirArchivo = {
    radicacion: '',
    archivo: '',
    extension: '',
    tipoDocumento: 'Principal',
  };
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadForm();
    this.getListPais();
    this.getDepartments();
    this.getListTipoIdentificacion();
  }

  handleChangeProcedure(idTramite: number) {}
  private getListTipoIdentificacion(): void {
    this.pqrsdService
      .tiposIdentificacionAllUsingGET(this.authorizationPqrsdApi)
      .pipe(take(1))
      .subscribe({
        next: (data: Array<TipoIdentificacion> | any) =>
          (this.tiposIdentificacion = data),
      });
  }

  handleChangeProcess(event: InputSwitchOnChangeEvent): void {
    const fcProcessNumber: FormControl = this.form.get(
      'numeroProceso'
    ) as FormControl;
    if (event.checked) {
      fcProcessNumber.enable();
      fcProcessNumber.setValidators([
        Validators.required,
        Validators.pattern(this.processNumberRegex),
      ]);
    } else {
      fcProcessNumber.disable();
      fcProcessNumber.clearValidators();
    }
    fcProcessNumber.updateValueAndValidity();
  }

  handleChangeCountryPNJ(campoId: number): void {
    const fcIdDepartamentoPNJ = this.form.get('idDepartamentoPNJ');
    const fcIdMunicipioPNJ = this.form.get('idMunicipioPNJ');
    if (campoId === 80) {
      fcIdDepartamentoPNJ?.addValidators(Validators.required);
      fcIdMunicipioPNJ?.addValidators(Validators.required);
    } else {
      fcIdDepartamentoPNJ?.removeValidators(Validators.required);
      fcIdMunicipioPNJ?.removeValidators(Validators.required);
    }
    fcIdDepartamentoPNJ?.setValue(null);
    fcIdMunicipioPNJ?.setValue(null);
    this.departmentsPNJ = campoId === 80 ? this.departments?.slice() : [];
  }

  handleChangeDepartmentPNJ(campoId: number): void {
    this.form.get('idMunicipioPNJ')?.setValue(null);
    if (campoId) {
      this.paisesControllerService
        .obtenerCiudadesHandlerUsingGET({
          idDepartamento: campoId.toString(),
          Authorization: this.authorizationPqrsdApi,
        })
        .subscribe({
          next: (data: Array<CiudadDTO>) => (this.municipalitiesPNJ = data),
        });
    } else {
      this.indicativo = ' ';
      this.municipalitiesPNJ = [];
    }
  }

  handleChangeCountryRem(campoId: number): void {
    const fcIdDepartamentoRem = this.form.get('idDepartamentoRem');
    const fcIdMunicipioRem = this.form.get('idMunicipioRem');
    if (campoId === 80) {
      fcIdDepartamentoRem?.addValidators(Validators.required);
      fcIdMunicipioRem?.addValidators(Validators.required);
    } else {
      fcIdDepartamentoRem?.removeValidators(Validators.required);
      fcIdMunicipioRem?.removeValidators(Validators.required);
    }
    this.form.get('idDepartamentoRem')?.setValue(null);
    this.departmentsRem = campoId === 80 ? this.departments.slice() : [];
  }

  handleChangeDepartmentRem(campoId: number): void {
    this.form.get('idMunicipioRem')?.setValue(null);
    if (campoId) {
      this.paisesControllerService
        .obtenerCiudadesHandlerUsingGET({
          idDepartamento: campoId.toString(),
          Authorization: this.authorizationPqrsdApi,
        })
        .subscribe({
          next: (data: Array<CiudadDTO>) => (this.municipalitiesRem = data),
        });
    } else {
      this.municipalitiesRem = [];
    }
  }
/*
  handleChangeNumeroIdentificacionPNJ(): void {
    this.getNaturalLegalPerson();
  }
*/
  onChangeRemPNJ(isPNJ: boolean): void {
    this.isRemPNJ = isPNJ;
    this.handleChangeRemPNJ();
  }

  showResponse(resp: any): void {
    this.isCaptchaResolved = true;
  }

  confirmTermAndCond(confirm: boolean): void {
    this.confirmTermCond = confirm;
  }

  isRequiredFormControl(ctrl: AbstractControl): boolean {
    return ctrl.hasValidator(Validators.required);
  }

  private loadForm(): void {
    this.tipoSolicitante = this.procedure?.tiposSolicitante;
    this.documents = this.procedure?.documentos;
    this.form = this.fb.group({
      validarCheck: new FormControl(),
      idTramite: new FormControl(this.procedure?.id, Validators.required),
      descripcionTramite: new FormControl(this.procedure?.descripcionSolicitud),
      claseProceso: new FormControl(this.procedure?.proceso.nombre),
      dependencia: new FormControl(
        this.procedure?.nombreGrupoTrabajo,
        Validators.required
      ),
      numeroProceso: new FormControl(),
      idTipoSolicitantePNJ: new FormControl(null, Validators.required),
      idTipoIdentificacionPNJ: new FormControl(null, Validators.required),
      nombreTipoIdentificacionPNJ: new FormControl(),
      numeroIdentificacionPNJ: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),
      nombreRazonSocialPNJ: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      telefonoPNJ: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
      ]),
      emailPNJ: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(7),
      ]),
      direccionPNJ: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      idPaisPNJ: new FormControl(80, Validators.required),
      paisPNJ: new FormControl(),
      idDepartamentoPNJ: new FormControl(null, Validators.required),
      departamentoPNJ: new FormControl(),
      idMunicipioPNJ: new FormControl(null, Validators.required),
      municipioPNJ: new FormControl(),
      idTipoIdentificacionRem: new FormControl(null, Validators.required),
      nombreTipoIdentificacionRem: new FormControl(),
      numeroIdentificacionRem: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),
      nombreRem: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      telefonoRem: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
      ]),
      emailRem: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(7),
      ]),
      direccionRem: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      idPaisRem: new FormControl(80, Validators.required),
      paisRem: new FormControl(),
      idDepartamentoRem: new FormControl(null, Validators.required),
      departamentoRem: new FormControl(),
      idMunicipioRem: new FormControl(null, Validators.required),
      municipioRem: new FormControl(),
      emailRadicar: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      keyCapchat: new FormControl(),
    });
  }

  agregarOQuitarValidadorCamposObligatorios(
    campos: string[],
  ): void {
    for (let campo of campos) {
        this.form.controls[campo].addValidators(Validators.required);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        subirArchivo: this.tramitesServices.subirArchivo,
      },
      disableClose: true,
    });
  }



  subirArchivoFilenet(): void {
    this.tramitesServices.subirArchivoFilenet(this.subirArchivo).subscribe(
      (res) => {
        console.log('Se subio el archivo correctamente');
        console.log('Respuesta ' + res);
        this.guardarTramite();
      },
      (error) => {
        console.log('Error en subir archivo', error);
      }
    );
  }

  private getListPais(): void {
    this.paisService
      .obtenerPaisesHandlerUsingGET(this.authorizationPqrsdApi)
      .pipe(take(1))
      .subscribe({
        next: (data: Array<PaisDTO>) => (this.countries = data),
      });
    console.log(this.countries);
  }

  private getDepartments(): void {
    this.paisesControllerService
      .obtenerDepartamentosHandlerUsingGET(this.authorizationPqrsdApi)
      .subscribe({
        next: (data: Array<DepartamentoDTO>) => {
          this.departments = data;
        },
      });
  }
/*
  private getNaturalLegalPerson(): void {
    if (
      !this.form.value.idTipoIdentificacionPNJ ||
      !this.form.value.numeroIdentificacionPNJ
    )
      return;
    const params = {
      idTipoIdentificacion: this.form.value.idTipoIdentificacionPNJ,
      numeroIdentificacion: this.form.value.numeroIdentificacionPNJ,
    };
    this.naturalLegalPersonService
      .naturalLegalPerson$(params)
      .then(
        (
          observable: Observable<
            Array<NaturalLegalPersonBody> | WithoutResponseBody
          >
        ) => {
          observable.subscribe({
            next: (data) => {
              const naturalLegalPerson: NaturalLegalPersonBody | null =
                data && (data as Array<NaturalLegalPersonBody>)[0];
              this.handleChangeNaturalLegalPerson(naturalLegalPerson);
            },
            complete: () =>
              (this.isReadonly = !!this.form.value.nombreRazonSocialPNJ),
          });
        }
      )
      .catch((err) => console.log(`%c ${err}`, 'background-color: #f3e295;'));
  }
*/
  private handleChangeNaturalLegalPerson(
    naturalLegalPerson: NaturalLegalPersonBody | null
  ): void {
    this.form
      .get('nombreRazonSocialPNJ')
      ?.setValue(naturalLegalPerson?.razonSocial);
    this.form
      .get('telefonoPNJ')
      ?.setValue(naturalLegalPerson?.telefonosResidencia);
    this.form.get('emailPNJ')?.setValue(naturalLegalPerson?.correoElectronico);
    this.form
      .get('direccionPNJ')
      ?.setValue(naturalLegalPerson?.direccionResidencia);
    this.form.get('idPaisPNJ')?.setValue(naturalLegalPerson?.idPaisDomicilio);
    //this.form.get('codigoPaisPNJ')?.setValue(naturalLegalPerson.);
    this.form.get('paisPNJ')?.setValue(naturalLegalPerson?.paisDomicilio);
    this.form
      .get('idDepartamentoPNJ')
      ?.setValue(naturalLegalPerson?.idDepartamentoDomicilio);
    //this.form.get('codigoDepartamentoPNJ')?.setValue(naturalLegalPerson.);
    this.form
      .get('departamentoPNJ')
      ?.setValue(naturalLegalPerson?.departamentoDomicilio);
    this.form
      .get('idMunicipioPNJ')
      ?.setValue(naturalLegalPerson?.idCiudadDomicilio);
    //this.form.get('codigoMunicipioPNJ')?.setValue(naturalLegalPerson.);
    this.form
      .get('municipioPNJ')
      ?.setValue(naturalLegalPerson?.ciudadDomicilio);
    this.handleChangeRemPNJ();
  }

  private handleChangeRemPNJ(): void {
    this.form
      .get('idTipoIdentificacionRem')
      ?.setValue(
        this.isRemPNJ ? this.form.value.idTipoIdentificacionPNJ : null
      );
    this.form
      .get('nombreTipoIdentificacionRem')
      ?.setValue(
        this.isRemPNJ ? this.form.value.nombreTipoIdentificacionPNJ : null
      );
    this.form
      .get('numeroIdentificacionRem')
      ?.setValue(
        this.isRemPNJ ? this.form.value.numeroIdentificacionPNJ : null
      );
    this.form
      .get('nombreRem')
      ?.setValue(this.isRemPNJ ? this.form.value.nombreRazonSocialPNJ : null);
    this.form
      .get('telefonoRem')
      ?.setValue(this.isRemPNJ ? this.form.value.telefonoPNJ : null);
    this.form
      .get('emailRem')
      ?.setValue(this.isRemPNJ ? this.form.value.emailPNJ : null);
    this.form
      .get('direccionRem')
      ?.setValue(this.isRemPNJ ? this.form.value.direccionPNJ : null);
    this.form
      .get('idPaisRem')
      ?.setValue(this.isRemPNJ ? this.form.value.idPaisPNJ : null);
    this.form
      .get('paisRem')
      ?.setValue(this.isRemPNJ ? this.form.value.paisPNJ : null);
    this.form
      .get('idDepartamentoRem')
      ?.setValue(this.isRemPNJ ? this.form.value.idDepartamentoPNJ : null);
    this.form
      .get('departamentoRem')
      ?.setValue(this.isRemPNJ ? this.form.value.departamentoPNJ : null);
    this.form
      .get('idMunicipioRem')
      ?.setValue(this.isRemPNJ ? this.form.value.idMunicipioPNJ : null);
    this.form
      .get('municipioRem')
      ?.setValue(this.isRemPNJ ? this.form.value.municipioPNJ : null);
  }

  ngOnDestroy(): void {}

  progress: number = 0;
  cargaAnexos: any[] = [];
  progressFiles = (res: HttpEvent<any>) => {
    if (res.type === HttpEventType.UploadProgress) {
      this.progress = Math.round((100 * res.loaded) / res.total!);
    } else if (res.type === HttpEventType.Response) {
      //  console.log(`Respuesta al subir el archivo anexo al filenet`, res);
      //  console.log(`Respuesta al subir el archivo anexo al filenet`, res.body);
      const datos = res.body;
      this.cargaAnexos = datos['resultados'];
      const errores = this.cargaAnexos.findIndex((e) => e['codigo'] != 0);
      //   console.log(this.cargaAnexos + 'carga total anexos');
      if (-1 < errores) {
        Swal.fire({
          icon: 'error',
          text: 'Error al subir el ANEXO al filenet',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        });
      } else {
        this.loaderFile = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title:
            'Se guardaron con éxito un total de ' +
            this.cargaAnexos.length +
            ' Archivos',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  subirArchivoCorrespondenciaPrueba(): Subscription {
    let numeroArchivos = 0;
    const cantidadArchivos = this.tramitesServices.subirArchivo.anexos.length;
    const formData = new FormData();
    for (var i = 0; i < this.tramitesServices.subirArchivo.anexos.length; i++) {
      if (this.tramitesServices.subirArchivo.anexos[i].archivo) {
        formData.append(
          'archivos',
          this.tramitesServices.subirArchivo.anexos[i].archivo!
        );
      }
      this.tramitesServices.subirArchivo.anexos[i].archivo = undefined;
    }

    formData.append(
      'archivoUploadDTO',
      JSON.stringify(
        this.tramitesServices.subirArchivo.anexos.map((a) => {
          return {
            extension: a.extension,
            radicacion: a.radicacion,
            tipoDocumento: a.tipoDocumento,
            uploadBy: a.uploadBy,
          };
        })
      )
    );

    return this.tramitesServices.subirArchivoFilenetPrueba(formData).subscribe({
      next: this.progressFiles,
      error: (err) => {
        console.log(`Error al subir el anexo al filenet`, err);
        this.loaderFile = false;
        // this.loader = true;
        // this.enviarFormularioPqrsdf();
        Swal.fire({
          icon: 'error',
          text: 'Error al subir el ANEXO al filenet',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  uploadFileToFileNet(): void {
    this.loaderFile = true;

    this.tramitesServices.subirArchivo.anexos.forEach((archivo) => {
      console.log(archivo);
    });

    this.tramitesServices.getFilestoUpload(this.tramitesServices.subirArchivo);
    if (this.tramitesServices.subirArchivo.anexos.length !== 0) {
      this.tramitesServices.subirArchivo.anexos =
        this.tramitesServices.subirArchivo.anexos.map((archivo) => {
          archivo.radicacion = this.numeroTramite;
          delete archivo.nombre;
          return archivo;
        });

      let numeroArchivos = 0;
      const cantidadArchivos = this.tramitesServices.subirArchivo.anexos.length;
      const fsubs = this.subirArchivoCorrespondenciaPrueba();
    }
  }

  guardarTramite() {
    let DateFormulario;
    DateFormulario = new Date();
    const fechaFormulario = formatDate(DateFormulario, 'yyyy-MM-dd', 'en-US');

    const orderRequest: RadicacionRequestDto = {
      anexosFisicos: this.tramitesServices.subirArchivo.anexos.length,
      aplicaCiudadCodigo: this.form.get('idMunicipioPNJ')?.value,
      aplicaDepartamentoCodigo: this.form.get('idDepartamentoPNJ')?.value,
      aplicaPaisCodigo: this.form.get('idPaisPNJ')?.value,
      aplicaEmail: this.form.get('emailPNJ')?.value,
      aplicaDireccion: this.form.get('direccionPNJ')?.value,
      aplicaNombre: this.form.get('nombreRazonSocialPNJ')?.value,
      aplicaTelefono: Number(this.form.get('telefonoPNJ')?.value),
      aplicaIdentificacion: Number(
        this.form.get('numeroIdentificacionPNJ')?.value
      ),
      aplicaTipoIdentificacionId: Number(
        this.form.get('idTipoIdentificacionPNJ')?.value
      ),
      aplicaTipoIdentificacionNombre: this.form.get('numeroIdentificacionPNJ')
        ?.value,
      particularIdentificacion: Number(
        this.form.get('numeroIdentificacionRem')?.value
      ),
      particularNombre: this.form.get('nombreRem')?.value,
      particularTipoIdentificacionId: Number(
        this.form.get('idTipoIdentificacionRem')?.value
      ),
      particularTipoIdentificacionNombre: this.form.get(
        'numeroIdentificacionRem'
      )?.value,
      particularCiudadCodigo: this.form.get('idMunicipioRem')?.value,
      particularDepartamentoCodigo: this.form.get('idDepartamentoRem')?.value,
      particularPaisCodigo: this.form.get('idPaisRem')?.value,
      particularDireccion: this.form.get('direccionRem')?.value,
      particularTelefono: Number(this.form.get('telefonoRem')?.value),
      particularEmail: this.form.get('emailRem')?.value,
      //dependenciaId:Number(this.procedure?.codigoGrupoTrabajo),
      dependenciaId: 547,
      dependenciaNombre: this.procedure?.nombreGrupoTrabajo,
      //dependenciaNombre: 'GRUPO DE GESTION DOCUMENTAL',
      entregaFisica: false,
      foliosNumero: 1,
      referenciaExterna: 'PRUEBA SWITCH',
      cuadernoTipoId: 0,
      cuadernoCodigo: 0,
      documentalTipoId: 0,
      //documentalTipoCodigo:this.procedure?.proceso?.nombre,
      documentalTipoCodigo: '0',
      //tramiteId:this.procedure?.id,
      tramiteId: 0,
      //tramiteCodigo:Number(this.procedure?.codigo),
      tramiteCodigo: 29001,
      extensionArchivo: '.pdf',
      codigoMedioEnvio: 5,
      //codigoTipoSeguridad:this.procedure?.tipoSeguridadRadicacion?.nombre,
      codigoTipoSeguridad: 'ABIERTA',
      codigoSerie: 0,
      codigoSubSerie: 0,
      loginUsuario: 'aplicaciones',
      radicacionAnterior: '2023-07-000904',
      //nombreSerie:this.procedure?.proceso?.nombre,
      nombreSerie: 'TODAS',
      nombreSubSerie: 'TODAS',
    };
    if (this.form.valid) {
      const request = this.tramitesServices.guardarTramite$(orderRequest);
      request.subscribe({
        next: (res) => {
          this.numeroTramite = res.message;
          console.log(res);
          this.loader = false;
          Swal.fire({
            icon: 'success',
            text:
              'Su TRAMITE fue radicado con éxito con los siguientes datos: ' +
              ' N° de Tramite ' +
              res.message +
              '\n' +
              '. Fecha: ' +
              fechaFormulario +
              '\n' +
              '. La información de su TRAMITE fue enviada al correo electrónico principal registrado en el formulario.',
            confirmButtonColor: '#045cab',
            confirmButtonText: 'Aceptar',
          });
          if (this.tramitesServices.subirArchivo.anexos.length > 0) {
            this.uploadFileToFileNet();
          }
          this.sendEmail(
            this.form.value.emailRadicar,
            this.form.value.nombreRazonSocialPNJ,
            this.numeroTramite
          );
          this.resetFormulario();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            text:
              'Fallo la creacion de su TRAMITE' +
              '\n' +
              '. Fecha: ' +
              fechaFormulario,
            confirmButtonColor: '#045cab',
            confirmButtonText: 'Aceptar',
          });
        },
      });
      timer(30000).subscribe(() => {
        this.destroy$.next();
        this.destroy$.complete();
        this.loader = false;
        // console.log('La petición ha sido cancelada');
      });
    } else {
      this.loader = false;
      Object.keys(this.form.controls).forEach((control) => {
        this.form.controls[control].markAsTouched();
      });
      Swal.fire({
        icon: 'error',
        text: 'Faltan campos por diligenciar',
        confirmButtonColor: '#045cab',
        confirmButtonText: 'Aceptar',
      });
    }
  }
  resetFormulario() {
    this.form.reset();
    this.ArchivosFormulario = undefined;
    this.tramitesServices.subirArchivo.anexos = this.limpiarArchivos;
    this.statusCarga = false;
  }

  sendEmail(correoEnd: any, nombreUser: any, numeroRadicacion: any) {
    this.tramitesServices
      .enviarEmail(correoEnd, nombreUser, numeroRadicacion)
      .subscribe({
        next: (err) => {
          //  console.log(res, 'envio email');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
