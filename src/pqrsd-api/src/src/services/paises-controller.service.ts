/* tslint:disable */
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CiudadDTO } from '../models/ciudad-dto';
import { DepartamentoDTO } from '../models/departamento-dto';
import { PaisDTO } from '../models/pais-dto';
import { Injectable } from '@angular/core';

/**
 * Paises Controller
 */
@Injectable({
  providedIn: 'root',
})
class PaisesControllerService extends __BaseService {
  static readonly obtenerCiudadesHandlerUsingGETPath = '/paises/obtenerCiudades/{idDepartamento}';
  static readonly obtenerDepartamentosHandlerUsingGETPath = '/paises/obtenerDepartamentos';
  static readonly obtenerPaisesHandlerUsingGETPath = '/paises/obtenerPaises';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * obtenerCiudades
   *
   * Servicio para obtener el listado de ciudades
   * @param params The `PaisesControllerService.ObtenerCiudadesHandlerUsingGETParams` containing the following parameters:
   *
   * - `idDepartamento`: idDepartamento
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  obtenerCiudadesHandlerUsingGETResponse(params: PaisesControllerService.ObtenerCiudadesHandlerUsingGETParams): __Observable<__StrictHttpResponse<Array<CiudadDTO> | Array<CiudadDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paises/obtenerCiudades/${encodeURIComponent(String(params.idDepartamento))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CiudadDTO> | Array<CiudadDTO>>;
      })
    );
  }
  /**
   * obtenerCiudades
   *
   * Servicio para obtener el listado de ciudades
   * @param params The `PaisesControllerService.ObtenerCiudadesHandlerUsingGETParams` containing the following parameters:
   *
   * - `idDepartamento`: idDepartamento
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  obtenerCiudadesHandlerUsingGET(params: PaisesControllerService.ObtenerCiudadesHandlerUsingGETParams): __Observable<Array<CiudadDTO> | Array<CiudadDTO>> {
    return this.obtenerCiudadesHandlerUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<CiudadDTO> | Array<CiudadDTO>)
    );
  }

  /**
   * obtenerDepartamentos
   *
   * Servicio para obtener el listado de departamentos
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  obtenerDepartamentosHandlerUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<DepartamentoDTO> | Array<DepartamentoDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paises/obtenerDepartamentos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DepartamentoDTO> | Array<DepartamentoDTO>>;
      })
    );
  }
  /**
   * obtenerDepartamentos
   *
   * Servicio para obtener el listado de departamentos
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  obtenerDepartamentosHandlerUsingGET(Authorization: string): __Observable<Array<DepartamentoDTO> | Array<DepartamentoDTO>> {
    return this.obtenerDepartamentosHandlerUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<DepartamentoDTO> | Array<DepartamentoDTO>)
    );
  }

  /**
   * obtenerPaises
   *
   * Servicio para obtener el listado de paises
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  obtenerPaisesHandlerUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<PaisDTO> | Array<PaisDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paises/obtenerPaises`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PaisDTO> | Array<PaisDTO>>;
      })
    );
  }
  /**
   * obtenerPaises
   *
   * Servicio para obtener el listado de paises
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  obtenerPaisesHandlerUsingGET(Authorization: string): __Observable<Array<PaisDTO> | Array<PaisDTO>> {
    return this.obtenerPaisesHandlerUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<PaisDTO> | Array<PaisDTO>)
    );
  }
}

module PaisesControllerService {

  /**
   * Parameters for obtenerCiudadesHandlerUsingGET
   */
  export interface ObtenerCiudadesHandlerUsingGETParams {

    /**
     * idDepartamento
     */
    idDepartamento: string;

    /**
     * Authorization
     */
    Authorization: string;
  }
}

export { PaisesControllerService }
