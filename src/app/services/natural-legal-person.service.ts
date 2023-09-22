import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NaturalLegalPersonBody, WithoutResponseBody } from '../interfaces/natural-legal-person';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NaturalLegalPersonService {
  private readonly apiCorrespondenciaUrlBase: string = environment.apiCorrespondenciaUrlBase;
  private http: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  naturalLegalPerson$ = async ({idTipoIdentificacion, numeroIdentificacion}: {[key:string]:string}): Promise<Observable<Array<NaturalLegalPersonBody> | WithoutResponseBody>> => {
    const userValidated = await this._authService.checkLogin();
    if (userValidated) {
      return this.http.get<Array<NaturalLegalPersonBody> | WithoutResponseBody>(`${this.apiCorrespondenciaUrlBase}correspondencia/api/v1/consultarPersonaNaturalJuridicaPorId/${idTipoIdentificacion}/${numeroIdentificacion}`, {headers: new HttpHeaders({'Authorization': `Bearer ${userValidated.token}`})});
    } else {
      throw new Error('No fue posible auntenticarse');
    }
  }
}
