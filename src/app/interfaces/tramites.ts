import { Documentos } from "./documentos";
import { Proceso } from "./proceso";
import { TipoSeguridadRadicacion } from "./tipo-seguridad-radiacion";
import { TipoSolicitante } from "./tipo-solicitante";


export interface Tramites {
  id:number;
  nombreGrupoTrabajo:string;
  codigoGrupoTrabajo:string;
  tiposSolicitante:Array<TipoSolicitante>;
  tiposSeguridad:Array<TipoSeguridadRadicacion>;
  descripcionSolicitud:string;
  nombreAmigable:string;
  nombre:string;
  codigo:string;
  proceso:Proceso;
  documentos: Array<Documentos>;
  estado: Boolean;
  funcionario:string;
}
