

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormFurtComponent } from './pages/form-furt/form-furt.component';
import { FormSobornoIntComponent } from './pages/form-soborno-int/form-soborno-int.component';
import { ModalComponent } from './pages/modal/modal.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { NavBarComponent } from './pages/shared/nav-bar/nav-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ModalTermCondComponent } from './pages/shared/modal-term-cond/modal-term-cond.component';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TramitesServices } from './services/tramites.service';
import { AuthService } from './services/auth.service';
import { NgModule, forwardRef } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxCaptchaModule } from 'ngx-captcha';




@NgModule({
  declarations: [
    AppComponent,
    FormFurtComponent,
    FormSobornoIntComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressBarModule,
    BrowserModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    CommonModule,
    NavBarComponent,
    FooterComponent,
    DropdownModule,
    AccordionModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    InputSwitchModule,
    TooltipModule,
    KeyFilterModule,
    TableModule,
    NgxCaptchaModule,
    CheckboxModule,
    ModalTermCondComponent,
    PanelModule,
    RadioButtonModule,
    FileUploadModule,
    ToastModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    DatePipe

  ],
  providers: [TramitesServices, MessageService, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
