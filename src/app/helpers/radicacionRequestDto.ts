export const requestRadicacionRadicar ={
  anexosFisicos: "false",
  aplicaCiudadCodigo: "1",
  aplicaDepartamentoCodigo: "11",
  aplicaDireccion: "Dir 123",
  aplicaEmail: "prueba@nuvu.cc",
  aplicaIdentificacion: "999999999",
  aplicaNombre: "Representante Legal de Pruebas",
  aplicaPaisCodigo: "80",
  aplicaTelefono: "3105531681",
  aplicaTipoIdentificacionId: "1",
  aplicaTipoIdentificacionNombre: "CÉDULA",

  codigoMedioEnvio: "5",
  codigoSerie: "58",
  codigoSubSerie: "194",
  codigoTipoSeguridad: "ABIERTA",
  cuadernoCodigo: "30292457",
  cuadernoTipoId: "0",
  dependenciaId: "460",
  dependenciaNombre: "GRUPO DE ADMISIONES",
  documentalTipoCodigo: "OFICIO",
  documentalTipoId: "0",
  entregaFisica: "1",
  extensionArchivo: ".pdf",
  foliosNumero: "1",
  loginUsuario: "aplicaciones",
  nombreSerie: "PROCESOS JUDICIALES DE INSOLVENCIA",
  nombreSubSerie: "Proceso de Reorganización Abreviada",

  particularCiudadCodigo: "1",
  particularDepartamentoCodigo: "11",
  particularDireccion: "Dir 123",
  particularEmail: "prueba@nuvu.cc",
  particularIdentificacion: "999999999",
  particularNombre: "Representante Legal de Pruebas",
  particularPaisCodigo: "80",
  particularTelefono: "3105531681",
  particularTipoIdentificacionId: "1",
  particularTipoIdentificacionNombre: "CÉDULA",

  radicacionAnterior: "0",
  referenciaExterna: "",
  tramiteCodigo: 16500,
  tramiteId: "0"

}
export const InstanciarRadicacion ={
  numeroRadicado: '2023-01-006096',
  tipoRadicacion: 'Radicación Entrada',
  fechaVencimientoTarea: '2023-10-12',
  funcionarioAsignado: 'OMAR FABIO CUENTAS GONZALEZ',
  codigoDependencia: '548'
}

export const generarSticker = {
  cantidadSticker: 1,
  formatoRequerido: 'PDF',
  generadoPor: '',
  numRadicado: '2023-01-006799',
  numeroProceso: '',
}
export const estamparSticker = {
  base64Sticker: '',
  numeroRadicado: '2023-01-006799',
}

export const anexosMock = {
  archivo: new File(['contenido'], 'archivo.pdf'),
  extension: 'pdf',
  radicacion: '2023-01-006799',
  tipoDocumento: 'documento',
  uploadBy: 'usuario',
};

export const anexosMockArray = [
  {
    archivo: new File(['contenido'], 'archivo1.pdf'),
    extension: 'pdf',
    radicacion: '2023-01-006799',
    tipoDocumento: 'documento',
    uploadBy: 'usuario',
  },
  // ... otros anexos
];

