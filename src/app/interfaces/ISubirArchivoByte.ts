export interface ISubirArchivoByte {
  archivo: File | undefined;
  extension: string;
  radicacion: string;
  tipoDocumento: string;
  uploadBy: string;
  nombre?: string;
  tamanio?: string;
  seguridad?:string;
}
