/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeneralResponseDTO } from '../models/general-response-dto';

/**
 * Notificaciones Controller
 */
@Injectable({
  providedIn: 'root',
})
class NotificacionesControllerService extends __BaseService {
  static readonly getMediosEnvioNotificacionesUsingGETPath = '/notificaciones/api/v1/getMediosEnvioNotificaciones';
  static readonly getRolesNotificacionPersonaJuridicaUsingGETPath = '/notificaciones/api/v1/getRolesNotificacionPersonaJuridica';
  static readonly getRolesNotificacionPersonaNaturalUsingGETPath = '/notificaciones/api/v1/getRolesNotificacionPersonaNatural';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getMediosEnvioNotificaciones
   *
   * Servicio para obtener los medios de envio para notificaciones
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getMediosEnvioNotificacionesUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/notificaciones/api/v1/getMediosEnvioNotificaciones`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<GeneralResponseDTO> | {}>;
      })
    );
  }
  /**
   * getMediosEnvioNotificaciones
   *
   * Servicio para obtener los medios de envio para notificaciones
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getMediosEnvioNotificacionesUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.getMediosEnvioNotificacionesUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * getRolesNotificacionPersonaJuridica
   *
   * Servicio para obtener los roles de una persona Juridica
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getRolesNotificacionPersonaJuridicaUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/notificaciones/api/v1/getRolesNotificacionPersonaJuridica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<GeneralResponseDTO> | {}>;
      })
    );
  }
  /**
   * getRolesNotificacionPersonaJuridica
   *
   * Servicio para obtener los roles de una persona Juridica
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getRolesNotificacionPersonaJuridicaUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.getRolesNotificacionPersonaJuridicaUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * getRolesNotificacionPersonaNatural
   *
   * Servicio para obtener los roles de una persona Natural
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getRolesNotificacionPersonaNaturalUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/notificaciones/api/v1/getRolesNotificacionPersonaNatural`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<GeneralResponseDTO> | {}>;
      })
    );
  }
  /**
   * getRolesNotificacionPersonaNatural
   *
   * Servicio para obtener los roles de una persona Natural
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  getRolesNotificacionPersonaNaturalUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.getRolesNotificacionPersonaNaturalUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }
}

module NotificacionesControllerService {
}

export { NotificacionesControllerService }
