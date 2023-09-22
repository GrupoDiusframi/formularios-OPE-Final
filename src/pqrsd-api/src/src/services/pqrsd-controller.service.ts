/* tslint:disable */

import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeneralResponseDTO } from '../models/general-response-dto';
import { Formulario } from '../models/formulario';
import { TipoIdentificacion } from '../models/tipo-identificacion';
import { Injectable } from '@angular/core';

/**
 * Pqrsd Controller
 */
@Injectable({
  providedIn: 'root',
})
class PqrsdControllerService extends __BaseService {
  static readonly generoPersonaAllUsingGETPath = '/api/v1/generoPersonaAll';
  static readonly generoPersonaByIdUsingGETPath = '/api/v1/generoPersonaById';
  static readonly grupoInteresByIdUsingGETPath = '/api/v1/grupoInteresById';
  static readonly grupoPoblacionalByIdUsingGETPath = '/api/v1/grupoPoblacionalById';
  static readonly gruposInteresAllUsingGETPath = '/api/v1/gruposInteresAll';
  static readonly gruposPoblacionalesAllUsingGETPath = '/api/v1/gruposPoblacionalesAll';
  static readonly startPQRSDUsingPOSTPath = '/api/v1/iniciarPqrsd';
  static readonly nivelEscolaridadByIdUsingGETPath = '/api/v1/nivelEscolaridadById';
  static readonly nivelesEscolaridadAllUsingGETPath = '/api/v1/nivelesEscolaridadAll';
  static readonly profesionByIdUsingGETPath = '/api/v1/profesionById';
  static readonly profesionesAllUsingGETPath = '/api/v1/profesionesAll';
  static readonly tipoPersonaAllUsingGETPath = '/api/v1/tipoPersonaAll';
  static readonly tipoPersonaByIdUsingGETPath = '/api/v1/tipoPersonaById';
  static readonly tipoSolicitudAllUsingGETPath = '/api/v1/tipoSolicitudAll';
  static readonly tipoSolicitudByIdUsingGETPath = '/api/v1/tipoSolicitudById';
  static readonly tiposIdentificacionAllUsingGETPath = '/api/v1/tiposIdentificacionAll';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * generoPersonaAll
   *
   * Servicio para generoPersonaAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  generoPersonaAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/generoPersonaAll`,
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
   * generoPersonaAll
   *
   * Servicio para generoPersonaAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  generoPersonaAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.generoPersonaAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * generoPersonaById
   *
   * Servicio para generoPersonaById
   * @param params The `PqrsdControllerService.GeneroPersonaByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  generoPersonaByIdUsingGETResponse(params: PqrsdControllerService.GeneroPersonaByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/generoPersonaById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * generoPersonaById
   *
   * Servicio para generoPersonaById
   * @param params The `PqrsdControllerService.GeneroPersonaByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  generoPersonaByIdUsingGET(params: PqrsdControllerService.GeneroPersonaByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.generoPersonaByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * grupoInteresById
   *
   * Servicio para grupoInteresById
   * @param params The `PqrsdControllerService.GrupoInteresByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  grupoInteresByIdUsingGETResponse(params: PqrsdControllerService.GrupoInteresByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/grupoInteresById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * grupoInteresById
   *
   * Servicio para grupoInteresById
   * @param params The `PqrsdControllerService.GrupoInteresByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  grupoInteresByIdUsingGET(params: PqrsdControllerService.GrupoInteresByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.grupoInteresByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * grupoPoblacionalById
   *
   * Servicio para grupoPoblacionalById
   * @param params The `PqrsdControllerService.GrupoPoblacionalByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  grupoPoblacionalByIdUsingGETResponse(params: PqrsdControllerService.GrupoPoblacionalByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/grupoPoblacionalById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * grupoPoblacionalById
   *
   * Servicio para grupoPoblacionalById
   * @param params The `PqrsdControllerService.GrupoPoblacionalByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  grupoPoblacionalByIdUsingGET(params: PqrsdControllerService.GrupoPoblacionalByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.grupoPoblacionalByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * gruposInteresAll
   *
   * Servicio para gruposInteresAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  gruposInteresAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/gruposInteresAll`,
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
   * gruposInteresAll
   *
   * Servicio para gruposInteresAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  gruposInteresAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.gruposInteresAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * gruposPoblacionalesAll
   *
   * Servicio para gruposPoblacionalesAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  gruposPoblacionalesAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/gruposPoblacionalesAll`,
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
   * gruposPoblacionalesAll
   *
   * Servicio para gruposPoblacionalesAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  gruposPoblacionalesAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.gruposPoblacionalesAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * iniciarPqrsd
   *
   * Servicio para iniciar un PQRSD
   * @param params The `PqrsdControllerService.StartPQRSDUsingPOSTParams` containing the following parameters:
   *
   * - `formulario`: formulario
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  startPQRSDUsingPOSTResponse(params: PqrsdControllerService.StartPQRSDUsingPOSTParams): __Observable<__StrictHttpResponse<string | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.formulario;
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/iniciarPqrsd`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string | {}>;
      })
    );
  }
  /**
   * iniciarPqrsd
   *
   * Servicio para iniciar un PQRSD
   * @param params The `PqrsdControllerService.StartPQRSDUsingPOSTParams` containing the following parameters:
   *
   * - `formulario`: formulario
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  startPQRSDUsingPOST(params: PqrsdControllerService.StartPQRSDUsingPOSTParams): __Observable<string | {}> {
    return this.startPQRSDUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as string | {})
    );
  }

  /**
   * nivelEscolaridadById
   *
   * Servicio para nivelEscolaridadById
   * @param params The `PqrsdControllerService.NivelEscolaridadByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  nivelEscolaridadByIdUsingGETResponse(params: PqrsdControllerService.NivelEscolaridadByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/nivelEscolaridadById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * nivelEscolaridadById
   *
   * Servicio para nivelEscolaridadById
   * @param params The `PqrsdControllerService.NivelEscolaridadByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  nivelEscolaridadByIdUsingGET(params: PqrsdControllerService.NivelEscolaridadByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.nivelEscolaridadByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * nivelesEscolaridadAll
   *
   * Servicio para nivelesEscolaridadAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  nivelesEscolaridadAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/nivelesEscolaridadAll`,
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
   * nivelesEscolaridadAll
   *
   * Servicio para nivelesEscolaridadAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  nivelesEscolaridadAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.nivelesEscolaridadAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * profesionById
   *
   * Servicio para profesionById
   * @param params The `PqrsdControllerService.ProfesionByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  profesionByIdUsingGETResponse(params: PqrsdControllerService.ProfesionByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/profesionById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * profesionById
   *
   * Servicio para profesionById
   * @param params The `PqrsdControllerService.ProfesionByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  profesionByIdUsingGET(params: PqrsdControllerService.ProfesionByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.profesionByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * profesionesAll
   *
   * Servicio para profesionesAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  profesionesAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/profesionesAll`,
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
   * profesionesAll
   *
   * Servicio para profesionesAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  profesionesAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.profesionesAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * tipoPersonaAll
   *
   * Servicio para tipoPersonaAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tipoPersonaAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/tipoPersonaAll`,
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
   * tipoPersonaAll
   *
   * Servicio para tipoPersonaAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tipoPersonaAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.tipoPersonaAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * tipoPersonaById
   *
   * Servicio para tipoPersonaById
   * @param params The `PqrsdControllerService.TipoPersonaByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  tipoPersonaByIdUsingGETResponse(params: PqrsdControllerService.TipoPersonaByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/tipoPersonaById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * tipoPersonaById
   *
   * Servicio para tipoPersonaById
   * @param params The `PqrsdControllerService.TipoPersonaByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  tipoPersonaByIdUsingGET(params: PqrsdControllerService.TipoPersonaByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.tipoPersonaByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * tipoSolicitudAll
   *
   * Servicio para tipoSolicitudAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tipoSolicitudAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<GeneralResponseDTO> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/tipoSolicitudAll`,
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
   * tipoSolicitudAll
   *
   * Servicio para tipoSolicitudAll
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tipoSolicitudAllUsingGET(Authorization: string): __Observable<Array<GeneralResponseDTO> | {}> {
    return this.tipoSolicitudAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<GeneralResponseDTO> | {})
    );
  }

  /**
   * tipoSolicitudById
   *
   * Servicio para tipoSolicitudById
   * @param params The `PqrsdControllerService.TipoSolicitudByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  tipoSolicitudByIdUsingGETResponse(params: PqrsdControllerService.TipoSolicitudByIdUsingGETParams): __Observable<__StrictHttpResponse<GeneralResponseDTO | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.Authorization != null) __headers = __headers.set('Authorization', params.Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/tipoSolicitudById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneralResponseDTO | {}>;
      })
    );
  }
  /**
   * tipoSolicitudById
   *
   * Servicio para tipoSolicitudById
   * @param params The `PqrsdControllerService.TipoSolicitudByIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `Authorization`: Authorization
   *
   * @return Exitoso or No hay informacion
   */
  tipoSolicitudByIdUsingGET(params: PqrsdControllerService.TipoSolicitudByIdUsingGETParams): __Observable<GeneralResponseDTO | {}> {
    return this.tipoSolicitudByIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as GeneralResponseDTO | {})
    );
  }

  /**
   * tiposIdentificacionAll
   *
   * Servicio para obtener el listado de todos los tipos de identificación configurados en el sistema SIGS
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tiposIdentificacionAllUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<Array<TipoIdentificacion> | {}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/tiposIdentificacionAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TipoIdentificacion> | {}>;
      })
    );
  }
  /**
   * tiposIdentificacionAll
   *
   * Servicio para obtener el listado de todos los tipos de identificación configurados en el sistema SIGS
   * @param Authorization Authorization
   * @return Exitoso or No hay informacion
   */
  tiposIdentificacionAllUsingGET(Authorization: string): __Observable<Array<TipoIdentificacion> | {}> {
    return this.tiposIdentificacionAllUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as Array<TipoIdentificacion> | {})
    );
  }
}

module PqrsdControllerService {

  /**
   * Parameters for generoPersonaByIdUsingGET
   */
  export interface GeneroPersonaByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for grupoInteresByIdUsingGET
   */
  export interface GrupoInteresByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for grupoPoblacionalByIdUsingGET
   */
  export interface GrupoPoblacionalByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for startPQRSDUsingPOST
   */
  export interface StartPQRSDUsingPOSTParams {

    /**
     * formulario
     */
    formulario: Formulario;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for nivelEscolaridadByIdUsingGET
   */
  export interface NivelEscolaridadByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for profesionByIdUsingGET
   */
  export interface ProfesionByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for tipoPersonaByIdUsingGET
   */
  export interface TipoPersonaByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }

  /**
   * Parameters for tipoSolicitudByIdUsingGET
   */
  export interface TipoSolicitudByIdUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * Authorization
     */
    Authorization: string;
  }
}

export { PqrsdControllerService }
