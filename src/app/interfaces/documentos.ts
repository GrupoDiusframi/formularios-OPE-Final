import { Extensiones } from "./extensiones";

export interface Documentos {
  extensiones: Array<Extensiones>
  nombre: string;
  descripcion: string;
  documentoPrincipal:Boolean;
}
