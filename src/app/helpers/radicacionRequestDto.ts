export const requestRadicacionRadicar ={
  anexosFisicos:12,
  aplicaCiudadCodigo:263,
  aplicaDepartamentoCodigo:91,
  aplicaPaisCodigo:80,
  aplicaEmail:'casarrubia@gmail.com',
  aplicaDireccion:'calle 10',
  aplicaNombre:'BBBBBBBBBBBB',
  aplicaTelefono:78456895,
  aplicaIdentificacion:874568955,
  aplicaTipoIdentificacionId:1,

  aplicaTipoIdentificacionNombre:'CÉDULA',
  particularIdentificacion:874568955,
  particularNombre:'BBBBBBBBBBBB',
  particularTipoIdentificacionId:1,
  particularTipoIdentificacionNombre:'CÉDULA',
  particularCiudadCodigo:263,
  particularDepartamentoCodigo:91,
  particularPaisCodigo:80,
  particularDireccion:'calle 10',
  particularTelefono:78456895,

  particularEmail:'casarrubia@gmail.com',
  dependenciaId:547,
  dependenciaNombre:'GRUPO DE GESTION DOCUMENTAL',
  entregaFisica:false,
  foliosNumero:1,
  referenciaExterna:'PRUEBA SWITCH',
  cuadernoTipoId:0,
  cuadernoCodigo:0,
  documentalTipoId:0,
  documentalTipoCodigo:'0',

  tramiteId:0,
  tramiteCodigo:29001,
  extensionArchivo:'.pdf',
  codigoMedioEnvio:5,
  codigoTipoSeguridad:'ABIERTA',
  codigoSerie:0,
  codigoSubSerie:0,
  loginUsuario:'aplicaciones',
  radicacionAnterior:'2023-07-000904',
  nombreSerie:'TODAS',
  nombreSubSerie:'TODAS'
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

