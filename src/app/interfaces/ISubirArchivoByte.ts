export interface ISubirArchivoByte {
  archivo: File | undefined;
  extension: string;
  radicacion: string;
  tipoDocumento: string;
  uploadBy: string;
  nombre?: string;
  tramite?:string;
}
