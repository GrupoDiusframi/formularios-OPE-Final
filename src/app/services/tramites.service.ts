import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, lastValueFrom, retry } from 'rxjs';
import { Tramites } from '../interfaces/tramites';
import { RadicacionRequestDto } from '../interfaces/radicacionRequest';
import { ISubirArchivo } from '../interfaces/ISubirArchivo';
import { Files } from '../interfaces/Files.model';
import { Subject, timer } from 'rxjs';
import { UserValidated } from '../interfaces/user-validated';
import { Injectable, inject } from '@angular/core';
import { Tramite } from '../interfaces/radicacion-radicar';
import { ProfesorResponse } from '../interfaces/ProfesorResponse';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Basic c3NvYy1wcXJzZDpDTEF2ZV8wOTg=',
    Accept: '*/*',
  }),
  params: {},
};

const httpOptionsEnvio = {
  headers: new HttpHeaders({
    Authorization: 'Basic d2FzYWRtaW46Q2w0djNXNFM0ZG0xbg==',
    Accept: '*/*',
  }),
  params: {},
};

@Injectable({
  providedIn: 'root',
})
export class TramitesServices {
  private readonly apiCorrespondenciaUrlBase: string =
    environment.apiUrlBaseDev;
  private readonly apiCorrespondenciaUrlBaseRadicar: string =
    environment.apiUrlBaseRadicar;
  RADICACION = environment.CORRESPODENCIA;
  correspondenciaPrueba = environment.correspondenciaPrueba;
  URLBACKEND = environment.URLPRUEBA;
  password = environment.password;
  username = environment.username;
  component = environment.component;
  subirArchivo!: Files;
  archivoCargados: any[] = [];
  token: string = '';
  filtersSource = new BehaviorSubject(null);
  private http: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  constructor(private httpClient: HttpClient) {
    this.generateToken();
    this. getProfesor();
  }


  signIn$ = <Observable<UserValidated>>this.http.post<UserValidated>(
    `${this.apiCorrespondenciaUrlBase}auth/api/v1/signin`,
    {
      component: this.component,
      username: this.username,
      password: this.password,
    }
  );

  listaTramites$(): Promise<Observable<Array<Tramites>>> {
    return this._authService.checkLogin().then((userValidated) => {
      if (userValidated) {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${userValidated.token}`)
          .set('Content-Type', 'application/json');
        return this.http.post<Array<Tramites>>(
          `${this.apiCorrespondenciaUrlBase}tramites/api/v1/buscarTramites`,
          JSON.stringify({}),
          { headers }
        )
      } else {
        throw new Error('No fue posible autenticarse');
      }
    });
  }

/*
  listaTramites$ = async (): Promise<Observable<Array<Tramites>>> => {
    const userValidated = await this._authService.checkLogin();
    //const  userValidated = await lastValueFrom(this.signIn$);
    if (userValidated) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${userValidated.token}`)
        .set('Content-Type', 'application/json');
      return this.http.post<Array<Tramites>>(
        `${this.apiCorrespondenciaUrlBase}tramites/api/v1/buscarTramites`,
        JSON.stringify({}),
        { headers }
      );
    } else {
      throw new Error('No fue posible auntenticarse');
    }
  };
*/
  /*
  guardarTramite$ = async  (orderRequest: RadicacionRequestDto): Promise<Observable<RadicacionRequestDto>> =>{
    const userValidated = await this._authService.checkLogin();
    if (userValidated) {
      const headers = new HttpHeaders() .set('Authorization', `Bearer ${userValidated.token}`).set('Content-Type', 'application/json');
      return this.http.post<RadicacionRequestDto>(`${this.apiCorrespondenciaUrlBaseRadicar}desacople-services/api/v3/radicacionEntrada`,
        orderRequest, { headers });
    }
    else {
      throw new Error('No fue posible auntenticarse');
    }

  }
*/
  guardarTramite$(orderRequest: RadicacionRequestDto): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Content-Type', 'application/json');
    return this.http.post<RadicacionRequestDto>(
      `${this.apiCorrespondenciaUrlBaseRadicar}desacople-services/api/v3/radicacionEntrada`,
      orderRequest,
      { headers }
    );
  }

  subirArchivoFilenet(subirArchivo: ISubirArchivo): Observable<any> {
    const httpOptionsRadicado = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
      params: {},
    };
    return this.http.post<any>(
      this.correspondenciaPrueba + '/filenet/api/v1/archivoSubir',
      subirArchivo,
      httpOptionsRadicado
    );
  }

  enviarEmail(
    correoElectronico: any,
    nombreUsername: any,
    radicadoNumero: any
  ): Observable<any> {
    let body = {
      correo: correoElectronico,
      nombreUsuario: nombreUsername,
      numeroRadicado: radicadoNumero,
    };

    return this.httpClient.post<any>(
      this.URLBACKEND + 'send-email',
      body,
      httpOptions
    );
  }

  subirArchivoFilenetPrueba(subirArchivo: FormData): Observable<any> {
    return this.httpClient.post<any>(
      `${this.correspondenciaPrueba}filenet/api/v1/archivoSubirMultiparts`,
      subirArchivo,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  getProfesor(): Observable<ProfesorResponse[]> {
    return this.http.get<ProfesorResponse[]>(`http://localhost:8080/getProfesores`);
  }

  generateToken(): void {
    let body = {
      component: this.component,
      password: this.password,
      username: this.username,
    };

    this.httpClient
      .post<any>(`${this.apiCorrespondenciaUrlBase}auth/api/v1/signin`, body)
      .pipe(retry(3))
      .subscribe(
        {
        next: (res:any) => {
          this.token = res.token;
          console.log(res);
        },
      }),(error:any) => {
        console.error('Error al obtener la lista de trámites:', error);
                // Puedes agregar aquí código adicional para manejar el error, como mostrar un mensaje al usuario
          }
  }

  getFilestoUpload(isubirArchivo: any) {
    this.subirArchivo = isubirArchivo;
  }

  getArchivosCargados(uploadArchivo: any[]) {
    this.archivoCargados = uploadArchivo;
  }

}