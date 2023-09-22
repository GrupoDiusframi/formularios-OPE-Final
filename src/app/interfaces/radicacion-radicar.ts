export interface RadicacionBody {
  tipoIdentificacionRadicador: string;
  numeroIdentificacionRadicador: string;
  medioDeEnvio: genericBody;
  multa: number;
  anexosFisicos: string;
  aplicaA: AplicaA;
  corresponsal: Corresponsal;
  dependencia: Dependencia;
  dependenciaAsignada: Dependencia;
  documentoPrincipal: string;
  documentosAnexos: string[];
  entregaFisica: boolean;
  folios: number;
  funcionario?: Funcionario;
  funcionarioAsignado: Funcionario;
  radicacionAnteriorNumero?: string;
  referenciaExterna?: string;
  terminoDias: number;
  tipo: string;
  tipoCuaderno: genericBody;
  tipoDocumental: genericBody;
  tipoSeguridad: TipoSeguridad;
  borrador: string;
  clasificacionDocumental: ClasificacionDocumental;
  tramite: Tramite;
}

export interface AplicaA {
  email: string;
  telefono: string;
  ciudad: Ciudad;
  direccion: string;
  identificacion: string;
  nombre: string;
  tipoIdentificacion: Dependencia;
}

export interface Ciudad {
  codigo: Codigo;
  departamento: string;
  nombre: string;
  pais: string;
}

export interface Codigo {
  ciudadCodigo: number;
  departamentoCodigo: number;
  paisCodigo: number;
}

export interface Dependencia {
  id: number;
  nombre: string;
}

export interface ClasificacionDocumental {
  codigoSerie: string;
  codigoSubSerie: string;
  nombreSerie: string;
  nombreSubSerie: string;
}

export interface Corresponsal {
  dependencia: Dependencia;
  particular: AplicaA;
  tipo: string;
}

export interface Funcionario {
  apellido: string;
  cargo: string;
  codigo: string;
  id: string;
  nemotecnico: string;
  nombre: string;
}

export interface genericBody {
  codigo: number;
  id: number;
  nombre: string;
}

export interface TipoSeguridad {
  codigo: string;
}

export interface Tramite {
  codigo: number;
  id: number;
  nombre: string;
  proceso: Proceso;
  termino: Termino;
  tipoSeguridad: TramiteTipoSeguridad;
}

export interface Proceso {
  codigo: number;
  id: number;
  Nombre: string;
}

export interface Termino {
  Dias: number;
  EsModificable: boolean;
}

export interface TramiteTipoSeguridad {
  SALIDA: Entrada;
  ENTRADA: Entrada;
  INTERNA: Entrada;
}

export interface Entrada {
  id: string;
  codigo: string;
  nombre: string;
}
