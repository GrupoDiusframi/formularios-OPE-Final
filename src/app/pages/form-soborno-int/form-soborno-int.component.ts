
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';



// PRIMENG
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

import { Observable, take } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RadicacionRequestDto } from 'src/app/interfaces/radicacionRequest';
import { TramitesServices } from 'src/app/services/tramites.service';
import { Tramites } from 'src/app/interfaces/tramites';
import { Component, Input, OnInit, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaisesControllerService } from 'src/pqrsd-api/src/src/services';
import { PaisDTO } from 'src/pqrsd-api/src/src/models';

@Component({
  selector: 'app-form-soborno-int',
  templateUrl: './form-soborno-int.component.html',
  styleUrls: ['./form-soborno-int.component.scss'],
})
export class FormSobornoIntComponent implements OnInit {

  //private readonly authorizationPqrsdApi = environment.authorizationPqrsdApi;
 // private fb: FormBuilder = inject(FormBuilder);
  //private paisService = inject(PaisesControllerService);
  //private messageService = inject(MessageService);
  //private fileUploadService: FileUploadService = new FileUploadService(this.messageService);
  //private tramitesServices = inject(TramitesServices);
/*
  form!: FormGroup;
  paises!: Array<PaisDTO>;
  uploadedFiles: Array<{[key:string]: File}> = [];

  @Input() procedure!: Tramites;
*/
  ngOnInit(): void {
    //this.loadForm();
    //this.getListPais();
  }
/*
  private loadForm(): void {
    this.form = this.fb.group({
      sabePersonaJuridica: ['No'],
      nombrePersonaJuridica: [{value: null, disabled: true}],
      paisHechos: [null, Validators.required],
      nombreEntidadExtranjera: [null, Validators.required],
      sabeNombreFuncionarios: ['No'],
      nombreFuncionarios: [{value: null, disabled: true}],
      sabeFechasHechos: ['No'],
      fechasHechos: [{value: null, disabled: true}],
      sabePersonasOfrecieron: ['No'],
      nombrePersonasOfrecieron: [{value: null, disabled: true}],
      hechos: [null, [Validators.required]],
      sabeOtraAutoridad: ['No'],
      nombreOtraAutoridad: [{value: null, disabled: true}],
      interesContacto: ['No'],
      correoElectronico: [{value:null, disabled: true}],
      numeroTelefono: [{value: null, disabled: true}]
    });
  }

  private getListPais(): void {
    this.paisService
      .obtenerPaisesHandlerUsingGET(this.authorizationPqrsdApi)
      .pipe(take(1))
      .subscribe({
        next: (data: Array<PaisDTO>) => (this.paises = data),
      });
  }

  handleChangeAnswerRadioButton(answer: string, keys: string | Array<string>): void {
    if (typeof keys === 'string') {
      keys = [keys] as Array<string>;
    }
    for (let key of keys) {
      const fcSabePersonaJuridica: FormControl = this.form.get(key) as FormControl;
      if (answer === 'Si') {
        fcSabePersonaJuridica.enable();
        fcSabePersonaJuridica.addValidators(Validators.required);
      }else {
        fcSabePersonaJuridica.disable();
        fcSabePersonaJuridica.removeValidators(Validators.required);
      }
      fcSabePersonaJuridica.updateValueAndValidity();
    }
  }

  onSelectAttachment(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && this.fileUploadService.validationFile(target)) {
      const data = {[target.id]: files[0]};
      const label = Array.from(target.labels as NodeList)[0] as HTMLLabelElement;
      label.innerHTML = `<i class="pi pi-upload"></i> &nbsp; ${files[0].name}`;
      const index = this.uploadedFiles.findIndex(file => file[target.id]);
      if (index >= 0) {
        this.uploadedFiles[index] = data
      }else {
        this.uploadedFiles.push(data)
      }
    }
  }
*/
}
