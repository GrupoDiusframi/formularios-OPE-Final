
import { Procedure } from './interfaces/procedure';

// PRIMENG
import { Observable, Subscription, map } from 'rxjs';
import { TramitesServices } from './services/tramites.service';
import { Tramites } from './interfaces/tramites';
import { PqrsdControllerService } from 'src/pqrsd-api/src/src/services';
import { environment } from 'src/environments/environment';
import { GeneralResponseDTO } from 'src/pqrsd-api/src/src/models';
import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ProfesorResponse } from './interfaces/ProfesorResponse';
import { SelectionService } from './services/compartido.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'FormularioOPE';
  private pqrsdService = inject(PqrsdControllerService);
  private tramitesServices = inject(TramitesServices);

  private readonly authorizationPqrsdApi = environment.authorizationPqrsdApi;
  procedure!: Tramites;

  datos: Array<Tramites>  = [];
  private subscription!: Subscription;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {
      this.getListTipoSolicitud();
      this.getListaTramites();
      this.selectionService.getSelectedProcedure().subscribe((selectedProcedure) => {
        this.procedure = selectedProcedure;
      });
  }

  private getListTipoSolicitud(): void {
    this.pqrsdService.tipoSolicitudAllUsingGET(this.authorizationPqrsdApi).pipe(
      map((data: Array<GeneralResponseDTO> | any) => data.map((obj: GeneralResponseDTO) => ({value: obj.id, name: obj.descripcion, type: 'pqrsd'})))
    ).subscribe({
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

  onSelectionChange() {
    this.selectionService.setSelectedProcedure(this.procedure);
  }

}

