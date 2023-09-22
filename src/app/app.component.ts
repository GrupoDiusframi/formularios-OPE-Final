
import { Procedure } from './interfaces/procedure';

// PRIMENG
import { Observable, Subscription, map } from 'rxjs';
import { TramitesServices } from './services/tramites.service';
import { Tramites } from './interfaces/tramites';
import { PqrsdControllerService } from 'src/pqrsd-api/src/src/services';
import { environment } from 'src/environments/environment';
import { GeneralResponseDTO } from 'src/pqrsd-api/src/src/models';
import { Component, OnInit, inject } from '@angular/core';
import { ProfesorResponse } from './interfaces/ProfesorResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FormularioOPE';
  private pqrsdService = inject(PqrsdControllerService);
  private tramitesServices = inject(TramitesServices);

  private readonly authorizationPqrsdApi = environment.authorizationPqrsdApi;
  procedure!: Tramites;
  procedures: Array<Procedure> = environment.procedures;
  datos: Array<Tramites>  = [];
  private subscription!: Subscription;

  ngOnInit(): void {
      this.getListTipoSolicitud();
      this.getListaTramites();
  }

  private getListTipoSolicitud(): void {
    this.pqrsdService.tipoSolicitudAllUsingGET(this.authorizationPqrsdApi).pipe(
      map((data: Array<GeneralResponseDTO> | any) => data.map((obj: GeneralResponseDTO) => ({value: obj.id, name: obj.descripcion, type: 'pqrsd'})))
    ).subscribe({
      next: (data: Array<Procedure>) => this.procedures.push(...data)
    });
  }

  private getListaTramites(){
    this.tramitesServices.listaTramites$()
    .then((observable: Observable<Array<Tramites>>) => {
      observable.subscribe({
        next: (response: Array<Tramites>) => {
          this.datos = response;
        },
      })
    })
    .catch(err => console.log(`%c ${err}`, 'background-color: #f3e295;'));
  }



}

