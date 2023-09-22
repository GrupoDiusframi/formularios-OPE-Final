export interface NaturalLegalPersonBody {
  ciudadDomicilio: CiudadDomicilio;
  ciudadFiscalRues: number;
  ciudadNotificacion: CiudadDomicilio;
  departamentoDomicilio: CiudadDomicilio;
  departamentoFiscalRues: number;
  departamentoNotificacion: CiudadDomicilio;
  digitoVerificacion: number;
  direccionFiscalRues: string;
  fechaCorteRues: Date;
  fechaIngreso: Date;
  fechaIngresoSistema: Date;
  nacionalidad: Nacionalidad;
  numeroIdentificacion: number;
  paisDomicilio: Nacionalidad;
  paisFiscalRues: number;
  paisNotificacion: Nacionalidad;
  segundaNacionalidad: Nacionalidad;
  tipoIdentificacion: TipoIdentificacion;
  actividadEconomicaCIIU: string;
  apartadoAereo: null;
  correoElectronico: string;
  direccionNotificacion: string;
  direccionResidencia: string;
  faxesNotificacion: null;
  faxesResidencia: null;
  genero: string;
  idCiudadDomicilio: number;
  idCiudadNotificacion: number;
  idDepartamentoDomicilio: number;
  idDepartamentoNotificacion: number;
  idNacionalidad: number;
  idPaisDomicilio: number;
  idPaisNotificacion: number;
  idSegundaNacionalidad: number;
  idTipoIdentificacion: number;
  numeroIdentificacionCaracter: string;
  paginaWeb: string;
  razonSocial: string;
  sigla: null;
  telefonosNotificacion: string;
  telefonosResidencia: string;
  versionActividadEconomica: string;
}

export interface CiudadDomicilio {
  idCiudad?: number;
  idDepartamento: number;
  idPais: number;
  nombre: string;
  pais?: null;
}

export interface Nacionalidad {
  idPais: number;
  nombre: string;
}

export interface TipoIdentificacion {
  idTipoIdentificacion: number;
  nombre: string;
}

export interface WithoutResponseBody {
  code: string;
  message: string;
}
