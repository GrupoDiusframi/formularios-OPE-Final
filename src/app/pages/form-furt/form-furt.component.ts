import { AppComponent } from './../../app.component';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// PRIMENG
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';

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
import { HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  PaisesControllerService,
  PqrsdControllerService,
} from 'src/pqrsd-api/src/src/services';
import { environment } from 'src/environments/environment';
import {
  CiudadDTO,
  DepartamentoDTO,
  PaisDTO,
} from 'src/pqrsd-api/src/src/models';
import { DatePipe, formatDate } from '@angular/common';
import { ModalTermCondComponent } from '../shared/modal-term-cond/modal-term-cond.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { GenerarSticker } from 'src/app/interfaces/generarSticker';
import { EstamparSticker } from 'src/app/interfaces/estamparSticker';
import { InstanciarRadicacion } from 'src/app/interfaces/instanciaRadicado';
import { Documentos } from 'src/app/interfaces/documentos';
import { ISubirArchivoByte } from 'src/app/interfaces/ISubirArchivoByte';
import { Files } from 'src/app/interfaces/Files.model';
import { Router } from '@angular/router';
import { SelectionService } from 'src/app/services/compartido.service';

@Component({
  selector: 'app-form-furt',
  templateUrl: './form-furt.component.html',
  styleUrls: ['./form-furt.component.scss'],
})
export class FormFurtComponent implements OnInit, OnDestroy, OnChanges {
  readonly authorizationPqrsdApi = environment.authorizationPqrsdApi;
  paisesControllerService: PaisesControllerService = inject(
    PaisesControllerService
  );
  paisService = inject(PaisesControllerService);

  fb: FormBuilder = inject(FormBuilder);
  pqrsdService = inject(PqrsdControllerService);
  tramitesServices = inject(TramitesServices);

  private destroy$ = new Subject<void>();
  loaderFile!: boolean;
  @Input() procedure!: Tramites;
  cantidadArchivoss!: number;
  loader!: boolean;
  numeroTramite!: string;
  readonly processNumberRegex: RegExp = /[0-9]{4}-[0-9]{3}-[0-9]{3}$/;
  @ViewChild('miCheckbox') miCheckbox!: MatCheckbox;
  tramite!: Tramites;
  atLeastOneRequiredFileUploaded: boolean = false;

  form!: FormGroup;
  datos: Array<Tramites> = [];
  tipoSolicitante: Array<TipoSolicitante> = [];
  isExistProcess: FormControl<boolean> = new FormControl();

  confirmTermCond!: boolean;
  isCaptchaResolved!: boolean;
  isReadonly!: boolean;
  isRemPNJ!: boolean;
  token: string = '';
  saving = false;
  generarSticker!: GenerarSticker;
  estamparSticker!: EstamparSticker;
  instanciarRadicacion!: InstanciarRadicacion;
  archivosCargadosExitoso!: Boolean;

  countries!: Array<PaisDTO>;
  departments!: Array<DepartamentoDTO>;

  departmentsPNJ!: Array<DepartamentoDTO>;
  municipalitiesPNJ!: Array<CiudadDTO>;
  departmentsRem!: Array<DepartamentoDTO>;
  municipalitiesRem!: Array<CiudadDTO>;
  documents: Array<Documentos> = [];
  uploadedFiles: Array<{ [key: string]: File }> = [];
  tiposIdentificacion!: Array<TipoIdentificacion>;
  tiposIdentificacionRem!: Array<TipoIdentificacion>;
  ArchivosFormulario: any;
  limpiarArchivos: any[] = [];
  statusCarga: boolean = false;
  seleccionInicial: boolean = false;
  paisCol: boolean = false;
  selectPersonaN: boolean = false;
  indicativo: string = ' ';
  tipoSol!: any;
  typeFile: boolean = false;
  folios: number = 1;
  tipoSeguridad!: string;
  nombrePorceso!: string;
  fechaActual = new Date();
  fechaFormateada: string | null;
  cantidadObligatorio:number = 0;

  subirArchivo: ISubirArchivo = {
    radicacion: '',
    archivo: '',
    extension: '',
    tipoDocumento: 'Principal',
  };

  filesToUpload: Files = {
    anexos: [],
  };

  constructor(private selectionService: SelectionService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    this.fechaFormateada = this.datePipe.transform(
      this.fechaActual,
      'yyyy-MM-dd'
    );
  }
  ngOnInit(): void {
    this.loadForm();
    this.getListPais();
    this.getDepartments();
    this.getListTipoIdentificacion();
  }

  cambiosTipoSolicitante(event: any) {
    const selectedTipoSolicitante: TipoSolicitante = event.value;
    this.tipoSol = selectedTipoSolicitante;

    if (this.tipoSol === '1') {
      setTimeout(() => {
        this.tiposIdentificacion = this.tiposIdentificacion.filter(
          (tipo) => ![5, 8, 12].includes(tipo.idTipoIdentificacion)
        );
        this.cd.detectChanges();
      }, 100);
    } else if (this.tipoSol === '4') {
      console.log('entro al 4');
      this.getListTipoIdentificacion();
      setTimeout(() => {
        this.tiposIdentificacion = this.tiposIdentificacion.filter(
          (tipo) => ![1, 2, 3, 4].includes(tipo.idTipoIdentificacion)
        );
        this.cd.detectChanges();
      }, 100);
    } else if (this.tipoSol === '2') {
      console.log('entro al 2');
      this.getListTipoIdentificacion();
      this.cd.detectChanges();
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['procedure']) {
      this.loadForm();
      this.tramite = this.procedure;
      const nuevoProcedure = changes['procedure'].currentValue as Tramites;
      this.tipoSolicitante = nuevoProcedure?.tiposSolicitante;
      this.documents = nuevoProcedure?.documentos;

      if (this.procedure.tiposSeguridad && Array.isArray(this.procedure.tiposSeguridad)) {
        this.procedure.tiposSeguridad.forEach((obj) => {
          this.tipoSeguridad = obj.codigo;
        });
      }
      this.documents.forEach((obj) => {
        if (obj.obligatorio === true) {
          this.cantidadObligatorio++;
        }
      });

      this.form.get('idTramite')?.setValue(nuevoProcedure?.id);
      this.form
        .get('descripcionTramite')
        ?.setValue(nuevoProcedure?.descripcionSolicitud);
      this.form.get('claseProceso')?.setValue(nuevoProcedure?.nombre);
      this.form
        .get('dependencia')
        ?.setValue(nuevoProcedure?.nombreGrupoTrabajo);
    }
  }

  cambiarEstadoCheckbox(estado: boolean): void {
    this.miCheckbox.checked = estado; // Establece el estado del checkbox
  }

  openDialogPrograma(): void {
    const dialogRef = this.dialog.open(ModalTermCondComponent, {
      width: '100vh',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cambiarEstadoCheckbox(true);
      }
      if (!result) {
        this.cambiarEstadoCheckbox(false);
      }
    });
  }

  getListTipoIdentificacion(): void {
    this.pqrsdService
      .tiposIdentificacionAllUsingGET(this.authorizationPqrsdApi)
      .subscribe({
        next: (data: Array<TipoIdentificacion> | any) => {
          this.tiposIdentificacion = data;
          this.tiposIdentificacionRem = this.tiposIdentificacion; // Mover la asignación aquí
        },
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

  loadForm(): void {
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
      emailPNJ: new FormControl(null, [Validators.required, Validators.email]),
      direccionPNJ: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      idPaisPNJ: new FormControl(Validators.required),
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
      emailRem: new FormControl(null, [Validators.required, Validators.email]),
      direccionRem: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      idPaisRem: new FormControl(Validators.required),
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

  agregarOQuitarValidadorCamposObligatorios(campos: string[]): void {
    for (let campo of campos) {
      this.form.controls[campo].addValidators(Validators.required);
    }
  }
/*
  openDialog(tipoDocumento: Boolean) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        subirArchivo: this.tramitesServices.subirArchivo,
        tipoDocumento: tipoDocumento,
      },
      disableClose: true,
    });
  }
  */

  subirArchivoFilenet(): void {
    this.tramitesServices.subirArchivoFilenet(this.subirArchivo).subscribe(
      (res) => {
        this.guardarTramite();
      },
      (error) => {
        console.log('Error en subir archivo', error);
      }
    );
  }

  getListPais(): void {
    this.paisService
      .obtenerPaisesHandlerUsingGET(this.authorizationPqrsdApi)
      .pipe(take(1))
      .subscribe({
        next: (data: Array<PaisDTO>) => (this.countries = data),
      });
    console.log(this.countries);
  }

  getDepartments(): void {
    this.paisesControllerService
      .obtenerDepartamentosHandlerUsingGET(this.authorizationPqrsdApi)
      .subscribe({
        next: (data: Array<DepartamentoDTO>) => {
          this.departments = data;
        },
      });
  }

  handleChangeRemPNJ(): void {
    setTimeout(() => {
      this.tiposIdentificacionRem;
      this.tiposIdentificacion;
    }, 4000);
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
    this.municipalitiesRem = this.municipalitiesPNJ;
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
        this.archivosCargadosExitoso = false;
        Swal.fire({
          icon: 'error',
          text: 'Error al subir el ANEXO al filenet',
          confirmButtonColor: '#045cab',
          confirmButtonText: 'Aceptar',
        });
      } else {
        this.archivosCargadosExitoso = true;
        this.loaderFile = false;

        this.generarSticker = {
          cantidadSticker: 1,
          formatoRequerido: 'PDF',
          generadoPor: 'string',
          numRadicado: this.numeroTramite,
          numeroProceso: 'string',
        };
        this.estamparSticker = {
          base64Sticker: '',
          numeroRadicado: this.numeroTramite,
        };
        this.instanciarRadicacion = {
          numeroRadicado: this.numeroTramite,
          tipoRadicacion: 'Radicación Entrada',
          fechaVencimientoTarea: this.fechaFormateada,
          funcionarioAsignado: 'HIGHTECH S.A',
          codigoDependencia: this.procedure.codigoGrupoTrabajo,
        };

        this.tramitesServices
        .generateStickerUsingPOST(this.generarSticker)
        .pipe(take(1))
        .subscribe((genSticker) => {
          console.log('se genero Sticker');
        });
      this.tramitesServices
        .estamparStickerRequestDTO(this.estamparSticker)
        .pipe(take(1))
        .subscribe((estSticker) => {
          console.log('se estampo Sticker');
        });
      this.tramitesServices
        .instanciarRadicacion(this.instanciarRadicacion)
        .pipe(take(1))
        .subscribe((insRadicacion) => {
          console.log('se instancio Radicacion');
        });
      this.sendEmail(
        this.form.value.emailRadicar,
        this.form.value.nombreRazonSocialPNJ,
        this.numeroTramite
      );
      this.saving = false;
      Swal.fire({
        icon: 'success',
        text:
          'Su TRAMITE fue radicado con éxito con los siguientes datos: ' +
          ' N° de Tramite ' +
          this.numeroTramite +
          '\n' +
          '. Fecha: ' +
          this.fechaFormateada +
          '\n' +
          '. La información de su TRAMITE fue enviada al correo electrónico principal registrado en el formulario.',
        confirmButtonColor: '#045cab',
        confirmButtonText: 'Aceptar',
      }).then(() => {
          this.selectionService.clearSelection();
      });

      this.documents = [];
      this.filesToUpload.anexos = [];
      this.resetFormulario();


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

  subirArchivoCorrespondenciaPruebaDMV(): Subscription {
    let numeroArchivos = 0;
    const cantidadArchivos = this.filesToUpload.anexos.length;

    this.filesToUpload.anexos.forEach((a) => {
      a.radicacion = this.numeroTramite;
    });
    const formData = new FormData();
    for (var i = 0; i < this.filesToUpload.anexos.length; i++) {
      if (this.filesToUpload.anexos[i].archivo) {
        formData.append('archivos', this.filesToUpload.anexos[i].archivo!);
      }
      this.filesToUpload.anexos[i].archivo = undefined;
    }

    formData.append(
      'archivoUploadDTO',
      JSON.stringify(
        this.filesToUpload.anexos.map((a) => {
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

  uploadFileToFileNetDMV(): void {
    this.loaderFile = true;
    this.filesToUpload.anexos.forEach((archivo) => {
      console.log(archivo, 'archivos uploadFileToFileNetDMV');
    });

    //  this.tramitesServices.getFilestoUpload(this.tramitesServices.subirArchivo);
    if (this.filesToUpload.anexos.length !== 0) {
      this.subirArchivoCorrespondenciaPruebaDMV();
    }
  }

  onUploadFile($event: any, tramite?: any, extension?: any, registro?: any) {
    this.typeFile = false;
    let files: File[] = $event.target.files;
    this.filesToUpload.anexos = this.filesToUpload.anexos.filter((anexo) => {
      return anexo.tramite !== tramite;
    });

    extension.forEach((a: any) => {
      if (a.nombre == $event.target.files[0].name.split('.').pop()) {
        this.typeFile = true;
      }
    });
    if (this.typeFile) {
      for (let file of files) {
        let anexo = {
          archivo: file,
          extension: file.name.split('.')[1],
          radicacion: this.numeroTramite as string,
          tipoDocumento: 'Anexo',
          uploadBy: 'PQRS',
          nombre: file.name.split('.')[0],
          tramite: tramite,
        } as ISubirArchivoByte;
        this.filesToUpload.anexos.push(anexo);
      }
    } else {
      const inputElement = $event.target as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }

      Swal.fire({
        icon: 'error',
        text: 'El formato del archivo que esta cargando no corresponde.',
        confirmButtonColor: '#045cab',
        confirmButtonText: 'Aceptar',
      });
    }
    let cantidad = 0;
    if (registro.obligatorio === true) {
      cantidad++;
      if(cantidad = this.cantidadObligatorio){
        this.atLeastOneRequiredFileUploaded = true;
      }
    }
  }

  guardarTramite() {
    this.saving = true;
    if (!this.form.valid) {
      this.saving = false;
    }
    let DateFormulario;
    DateFormulario = new Date();
    const fechaFormulario = formatDate(DateFormulario, 'yyyy-MM-dd', 'en-US');
    this.procedure?.documentos.forEach((fol) => {
      if (fol.documentoPrincipal != null) {
        this.folios++;
      }
    });

    const orderRequest: RadicacionRequestDto = {
      anexosFisicos: this.filesToUpload.anexos.length.toString(),
      aplicaCiudadCodigo: this.form.get('idMunicipioPNJ')?.value,
      aplicaDepartamentoCodigo: this.form.get('idDepartamentoPNJ')?.value,
      aplicaPaisCodigo: this.form.get('idPaisPNJ')?.value,
      aplicaEmail: this.form.get('emailPNJ')?.value,
      aplicaDireccion: this.form.get('direccionPNJ')?.value,
      aplicaNombre: this.form.get('nombreRazonSocialPNJ')?.value,
      aplicaTelefono: this.form.get('telefonoPNJ')?.value,
      aplicaIdentificacion: this.form.get('numeroIdentificacionPNJ')?.value,
      aplicaTipoIdentificacionId: this.form.get('idTipoIdentificacionPNJ')?.value?.toString(),
      aplicaTipoIdentificacionNombre: '',
      particularIdentificacion: this.form.get('numeroIdentificacionRem')?.value,
      particularNombre: this.form.get('nombreRem')?.value,
      particularTipoIdentificacionId: this.form.get('idTipoIdentificacionRem')?.value?.toString(),
      particularTipoIdentificacionNombre: '',
      particularCiudadCodigo: this.form.get('idMunicipioRem')?.value,
      particularDepartamentoCodigo: this.form.get('idDepartamentoRem')?.value,
      particularPaisCodigo: this.form.get('idPaisRem')?.value,
      particularDireccion: this.form.get('direccionRem')?.value,
      particularTelefono: this.form.get('telefonoRem')?.value,
      particularEmail: this.form.get('emailRem')?.value,

      dependenciaId: this.procedure?.codigoGrupoTrabajo,
      dependenciaNombre: this.procedure?.nombreGrupoTrabajo,
      entregaFisica: '0',
      foliosNumero: this.folios.toString(),
      cuadernoTipoId: '0',
      cuadernoCodigo: '30292457',
      documentalTipoId: '0',
      documentalTipoCodigo: 'OFICIO',
      extensionArchivo: '.pdf',
      codigoMedioEnvio: '5',
      codigoTipoSeguridad: this.tipoSeguridad,
      codigoSerie: '58',
      codigoSubSerie: '194',
      loginUsuario: 'aplicaciones',
      nombreSerie: 'PROCESOS JUDICIALES DE INSOLVENCIA',
      nombreSubSerie: 'Proceso de Reorganización Abreviada',

      radicacionAnterior: '2023-07-000904',
      tramiteCodigo: Number(this.procedure?.codigo),
      referenciaExterna: '',
      tramiteId: this.procedure?.id.toString(),
    };

    if (orderRequest.aplicaTipoIdentificacionId === '1') {
      orderRequest.aplicaTipoIdentificacionNombre = 'CÉDULA';
    } else if (orderRequest.aplicaTipoIdentificacionId === '2') {
      orderRequest.aplicaTipoIdentificacionNombre = 'CÉDULA DE EXTRANJERÍA';
    } else if (orderRequest.aplicaTipoIdentificacionId === '3') {
      orderRequest.aplicaTipoIdentificacionNombre = 'PASAPORTE';
    } else if (orderRequest.aplicaTipoIdentificacionId === '4') {
      orderRequest.aplicaTipoIdentificacionNombre = 'TARJETA DE IDENTIDAD';
    } else if (orderRequest.aplicaTipoIdentificacionId === '5') {
      orderRequest.aplicaTipoIdentificacionNombre = 'NIT';
    } else if (orderRequest.aplicaTipoIdentificacionId === '6') {
      orderRequest.aplicaTipoIdentificacionNombre =
        'IMC (INTERMEDIARIO CAMBIARIO)';
    } else if (orderRequest.aplicaTipoIdentificacionId === '7') {
      orderRequest.aplicaTipoIdentificacionNombre = 'OTRO TIPO DE DOCUMENTO';
    } else if (orderRequest.aplicaTipoIdentificacionId === '8') {
      orderRequest.aplicaTipoIdentificacionNombre = 'NIT ESPECIAL';
    } else if (orderRequest.aplicaTipoIdentificacionId === '9') {
      orderRequest.aplicaTipoIdentificacionNombre = 'EXHORTO';
    } else if (orderRequest.aplicaTipoIdentificacionId === '10') {
      orderRequest.aplicaTipoIdentificacionNombre = 'IE SocExt BcoRep';
    } else if (orderRequest.aplicaTipoIdentificacionId === '11') {
      orderRequest.aplicaTipoIdentificacionNombre =
        'No. IDENTIFICA CASA MATRIZ';
    } else if (orderRequest.aplicaTipoIdentificacionId === '12') {
      orderRequest.aplicaTipoIdentificacionNombre = 'MATRICULA MERCANTIL';
    } else if (orderRequest.aplicaTipoIdentificacionId === '13') {
      orderRequest.aplicaTipoIdentificacionNombre = 'SE';
    } else if (orderRequest.aplicaTipoIdentificacionId === '14') {
      orderRequest.aplicaTipoIdentificacionNombre = 'IDENTIFICA SOC EXTRANJERA';
    } else if (orderRequest.aplicaTipoIdentificacionId === '15') {
      orderRequest.aplicaTipoIdentificacionNombre = 'INTERVENCION PAGINA WEB';
    } else if (orderRequest.aplicaTipoIdentificacionId === '16') {
      orderRequest.aplicaTipoIdentificacionNombre = 'PATRIMONIO AUTONOMO';
    } else if (orderRequest.aplicaTipoIdentificacionId === '17') {
      orderRequest.aplicaTipoIdentificacionNombre =
        'SIN IDENTIFICACIÓN MERCANTILES';
    }


    if (orderRequest.particularTipoIdentificacionId === '1') {
      orderRequest.particularTipoIdentificacionNombre = 'CÉDULA';
    } else if (orderRequest.particularTipoIdentificacionId === '2') {
      orderRequest.particularTipoIdentificacionNombre = 'CÉDULA DE EXTRANJERÍA';
    } else if (orderRequest.particularTipoIdentificacionId === '3') {
      orderRequest.particularTipoIdentificacionNombre = 'PASAPORTE';
    } else if (orderRequest.particularTipoIdentificacionId === '4') {
      orderRequest.particularTipoIdentificacionNombre = 'TARJETA DE IDENTIDAD';
    } else if (orderRequest.particularTipoIdentificacionId === '5') {
      orderRequest.particularTipoIdentificacionNombre = 'NIT';
    } else if (orderRequest.particularTipoIdentificacionId === '6') {
      orderRequest.particularTipoIdentificacionNombre =
        'IMC (INTERMEDIARIO CAMBIARIO)';
    } else if (orderRequest.particularTipoIdentificacionId === '7') {
      orderRequest.particularTipoIdentificacionNombre =
        'OTRO TIPO DE DOCUMENTO';
    } else if (orderRequest.particularTipoIdentificacionId === '8') {
      orderRequest.particularTipoIdentificacionNombre = 'NIT ESPECIAL';
    } else if (orderRequest.particularTipoIdentificacionId === '9') {
      orderRequest.particularTipoIdentificacionNombre = 'EXHORTO';
    } else if (orderRequest.particularTipoIdentificacionId === '10') {
      orderRequest.particularTipoIdentificacionNombre = 'IE SocExt BcoRep';
    } else if (orderRequest.particularTipoIdentificacionId === '11') {
      orderRequest.particularTipoIdentificacionNombre =
        'No. IDENTIFICA CASA MATRIZ';
    } else if (orderRequest.particularTipoIdentificacionId === '12') {
      orderRequest.particularTipoIdentificacionNombre = 'MATRICULA MERCANTIL';
    } else if (orderRequest.particularTipoIdentificacionId === '13') {
      orderRequest.particularTipoIdentificacionNombre = 'SE';
    } else if (orderRequest.particularTipoIdentificacionId === '14') {
      orderRequest.particularTipoIdentificacionNombre =
        'IDENTIFICA SOC EXTRANJERA';
    } else if (orderRequest.particularTipoIdentificacionId === '15') {
      orderRequest.particularTipoIdentificacionNombre =
        'INTERVENCION PAGINA WEB';
    } else if (orderRequest.particularTipoIdentificacionId === '16') {
      orderRequest.particularTipoIdentificacionNombre = 'PATRIMONIO AUTONOMO';
    } else if (orderRequest.particularTipoIdentificacionId === '17') {
      orderRequest.particularTipoIdentificacionNombre =
        'SIN IDENTIFICACIÓN MERCANTILES';
    }
    if(orderRequest.dependenciaNombre){
      orderRequest.dependenciaNombre = orderRequest.dependenciaNombre.replace(/\s+$/g,  '');
    }


    if (this.form.valid) {
      const request = this.tramitesServices.guardarTramite$(orderRequest);
      console.log(orderRequest);
      request.subscribe({
        next: (res) => {
          this.numeroTramite = res.message;
          this.loader = false;

          console.log(
            'Objeto de Instancia Radicacion: ' + this.instanciarRadicacion
          );

          if (res.message && res.code != '-1') {
            console.log('se creo Tramite: ' + res.message);
            if (this.filesToUpload.anexos.length > 0) {
              this.uploadFileToFileNetDMV();
            }
          } else {
            this.saving = false;
            Swal.fire({
              icon: 'error',
              text: 'Falló al generar la radicación. Intente mas tarde.',
              confirmButtonColor: '#045cab',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        error: (err: any) => {
          this.saving = false;
          Swal.fire({
            icon: 'error',
            text: 'Falló al generar la radicación. Intente mas tarde.',
            confirmButtonColor: '#045cab',
            confirmButtonText: 'Aceptar',
          });
        },
      });
      timer(30000).subscribe(() => {
        this.destroy$.next();
        this.destroy$.complete();
        this.loader = false;
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
    this.isRemPNJ = false;
    this.isCaptchaResolved = false;
    this.confirmTermCond = false;
    this.ArchivosFormulario = undefined;
    this.tramitesServices.subirArchivo.anexos = this.limpiarArchivos;
    this.statusCarga = false;
  }

  sendEmail(correoEnd: any, nombreUser: any, numeroRadicacion: any) {
    this.tramitesServices
      .enviarEmail(correoEnd, nombreUser, numeroRadicacion)
      .pipe(take(1))
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
