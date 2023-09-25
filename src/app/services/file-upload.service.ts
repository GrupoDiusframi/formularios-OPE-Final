
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
/*
  constructor(private messageService: MessageService) {}

  validationFile(target: HTMLInputElement): boolean {
    let isValid: boolean = true;
    const file: File = (target.files as FileList)[0];
    if (!this.validationFileType(file, target.accept)) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'El formato del archivo no es válido'});
      isValid = false;
    }
    if (!this.validationFileSize(file, (1024*1024*1024*2))) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'El tamaño del archivo es mayor a 2Mb'});
      isValid = false;
    }
    return isValid;
  }

  private validationFileType(file: File, accepts: string): boolean {
    const types = accepts.split(',');
    let isValid: boolean = types.reduce((hasAccept, type) => {
      if (!hasAccept && type.includes('/')) {
        return file.type.includes(type.includes('/*') ? type.split('/')[0] : type);
      }
      return hasAccept
    }, false);

    if (!isValid && types.some(type => !type.includes('/'))) {
      const FORMAT_REGEX = new RegExp(`(${types.filter(type => !type.includes('/')).join('|\\')})$`, 'i');
      isValid = FORMAT_REGEX.test(file.name);
    }
    return isValid;
  }

  private validationFileSize(file: File, sizeBytes: number): boolean {
    return file.size <= sizeBytes;
  }
*/
}
