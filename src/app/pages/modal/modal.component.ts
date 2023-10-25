
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ISubirArchivo } from 'src/app/interfaces/ISubirArchivo';
import { Files } from 'src/app/interfaces/Files.model';
import { ISubirArchivoByte } from 'src/app/interfaces/ISubirArchivoByte';
import { TramitesServices } from 'src/app/services/tramites.service';
import { ModalSucces } from '../modal-radicacion/modal-radicacion.component';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  images: any[] = [];
  imagesNulo: any = null;
  allfiles: any = [];
  base64: string = 'Base64...';
  fileselected?: Blob;
  desde: number = 0;
  hasta: number = 4;
  imageUrl?: string;
  tamanioArchivo: number = 0;
  sizeFile: boolean = false;
  isubirArchivo: ISubirArchivo[] = [];
  deleteIisubirArchivo: ISubirArchivo[] = [];
  pageSize = 4;
  cargarchivos: boolean = false;
  myObject: Files;
  filesToUpload: Files = {
    anexos: [],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { subirArchivo: Files, tipoDocumento:Boolean },
    public dialogRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog,
    private pqrsdService: TramitesServices,
    private paginator: MatPaginatorIntl
  ) {
    this.myObject = data.subirArchivo;
    this.paginator.itemsPerPageLabel = 'Archivos por página';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit(): void {
    if (this.myObject.anexos?.length != 0) {
      this.filesToUpload = this.myObject;

      this.readObject(this.filesToUpload);
    }
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(ModalSucces, {
      width: '700px',
    });
  }

  readObject(archivosData: Files) {
    archivosData.anexos.forEach((x) => {
      if (x.archivo !== undefined) {
        this.images.push({
          name: x.nombre,
          type: x.extension,
        });
      }
    });

    /* const image = {
      name: archivosData.principal.nombre,
      type: archivosData.principal.extension,
      size: archivosData.principal.tamanio,
    };

    if (image.name != '') {
      this.images.push(image);
    }*/
  }

  cambiarpagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  onUploadFile($event: any, isPrincipalFile: boolean = false) {
    let fileInBase64: string = '';
    if (isPrincipalFile) {
      this.cargarchivos = true;
      /*    this.filesToUpload.principal = {
        archivo: '',
        extension: $event.target.files[0].name.split('.')[1],
        radicacion: localStorage.getItem('numeroRadicado') as string,
        tipoDocumento: 'Principal',
        uploadBy: 'PQRS',
        nombre: $event.target.files[0].name.split('.')[0],
        tamanio: $event.target.files[0].size,
      }; */
      this.tamanioArchivo = $event.target.files[0].size;
      const image = {
        name: $event.target.files[0].name.split('.')[0],
        type: $event.target.files[0].name.split('.')[1],
        size: $event.target.files[0].size,
      };

      //this.images.push(image);

      this.convertFile($event.target.files[0]).then((res) => {
        //  this.filesToUpload.principal.archivo = (res as string).split(',')[1];
        this.archivoCarga(res);
      });
    } else {
      this.cargarchivos = true;
      let files: File[] = $event.target.files;

      for (let file of files) {
        const tamanioMb = this.formatFileSize(file.size);
        console.log(tamanioMb);
        let anexo = {
          archivo: file,
          extension: file.name.split('.')[1],
          radicacion: localStorage.getItem('numeroRadicado') as string,
          tipoDocumento: 'Anexo',
          uploadBy: 'TRAMITE',
          nombre: file.name.split('.')[0],
          tamanio: tamanioMb,
          //     tamanio: `${file.size}`,
        } as ISubirArchivoByte;
        if(this.data.tipoDocumento){
          anexo.tipoDocumento = 'Principal';
        }
        const image = {
          name: file.name.split('.')[0],
          type: file.name.split('.')[1],
          size: tamanioMb,
        };
        this.tamanioArchivo = file.size;
        if (this.tamanioArchivo > 2000000000) {
          this.sizeFile = true;
        }
        if (files.length > 0) {
          this.images.push(image);
        }
        // this.convertFile(file).then(
        //   (res) => (
        //     this.archivoCarga(res),
        // (anexo.archivo = (res as string).split(',')[1])
        //   )
        // );
        this.filesToUpload.anexos.push(anexo);
      }
    }
  }

  formatFileSize(fileSizeInBytes: number): string {
    if (fileSizeInBytes < 1024) {
      return fileSizeInBytes + ' B';
    } else if (fileSizeInBytes < 1024 * 1024) {
      const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
      return fileSizeInKB + ' KB';
    } else {
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
      return fileSizeInMB + ' MB';
    }
  }

  archivoCarga(res: any) {
    /*    if (this.filesToUpload.principal.archivo != '' && res != '') {
      this.cargarchivos = false;
    } */
    if (res != '') {
      this.cargarchivos = false;
    }
  }

  filesOnservice() {
    this.pqrsdService.getFilestoUpload(this.filesToUpload);
    this.pqrsdService.getArchivosCargados(this.images);
  }

  emitValues(event: Event): void {
    event.preventDefault();
    this.imagesNulo = this.images;

    this.pqrsdService.getFilestoUpload(this.filesToUpload);
    this.pqrsdService.getArchivosCargados(this.images);
    this.pqrsdService.filtersSource.next(this.imagesNulo);
  }

  uploadFileToFileNet(): void {
    this.pqrsdService.getFilestoUpload(this.isubirArchivo);
    if (this.isubirArchivo.length !== 0) {
      this.isubirArchivo = this.isubirArchivo.map((archivo) => {
        delete archivo.nombre;

        return archivo;
      });
    }
  }

  deleteImage(image: any) {
    const index = this.images.indexOf(image);
    this.tamanioArchivo -= image.size;
    this.images.splice(index, 1);
    this.allfiles.splice(index, 1);

    if (this.tamanioArchivo < 2000000000) {
      this.sizeFile = false;
    }
    //console.log(this.filesToUpload);
    this.filesToUpload.anexos = this.filesToUpload.anexos.filter((a) => {
      return a.nombre != image.name;
    });

    /*   if (this.filesToUpload.principal.nombre == image.name) {
      this.filesToUpload.principal = {
        archivo: '',
        extension: '',
        radicacion: '',
        tipoDocumento: '',
        uploadBy: '',
        nombre: '',
        tamanio: '',
      };
    } */
  }

  base64Output?: string;

  convertFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => resolve(event.target?.result);
    });
  }
}
