export const requestRadicacionRadicar ={
  anexosFisicos: "1",
  aplicaCiudadCodigo: "405",
  aplicaDepartamentoCodigo: "91",
  aplicaPaisCodigo: "80",
  aplicaEmail: "casarrubia999@gmail.com",
  aplicaDireccion: "calle 20",
  aplicaNombre: "SOLICITUDES POR CENTRO DE CONCILIACIÓN",
  aplicaTelefono: "5555555",
  aplicaIdentificacion: "5555555",
  aplicaTipoIdentificacionId: "1",
  aplicaTipoIdentificacionNombre: "CÉDULA",
  particularIdentificacion: "5555555",
  particularNombre: "SOLICITUDES POR CENTRO DE CONCILIACIÓN",
  particularTipoIdentificacionId: "1",
  particularTipoIdentificacionNombre: "CÉDULA",
  particularCiudadCodigo: "405",
  particularDepartamentoCodigo: "91",
  particularPaisCodigo: "80",
  particularDireccion: "calle 20",
  particularTelefono: "5555555",
  particularEmail: "casarrubia999@gmail.com",
  dependenciaId: "460",
  dependenciaNombre: "GRUPO DE ADMISIONES",
  entregaFisica: "0",
  foliosNumero: "4",
  cuadernoTipoId: "0",
  cuadernoCodigo: "30292457",
  documentalTipoId: "0",
  documentalTipoCodigo: "OFICIO",
  extensionArchivo: ".pdf",
  codigoMedioEnvio: "5",
  codigoTipoSeguridad: "ABIERTA",
  codigoSerie: "58",
  codigoSubSerie: "194",
  loginUsuario: "aplicaciones",
  nombreSerie: "PROCESOS JUDICIALES DE INSOLVENCIA",
  nombreSubSerie: "Proceso de Reorganización Abreviada",
  radicacionAnterior: "2023-07-000904",
  tramiteCodigo: 16500,
  referenciaExterna: "1",
  tramiteId: "37"
}

export const tramite = {
  id: 16,
  nombreGrupoTrabajo: "GRUPO DE ADMISIONES",
  codigoGrupoTrabajo: "460",
  tiposSolicitante: [
      {
          codigo: "3",
          nombre: "Instituciones o dependencias pï¿½blicas"
      }
  ],
  tiposSeguridad: [
      {
          codigo: "ABIERTA",
          nombre: "ABIERTA"
      }
  ],
  descripcionSolicitud: "Prueba",
  nombreAmigable: "Prueba2",
  nombre: "ADMISIÓN A REORGANIZACIÓN ABREVIADA",
  codigo: "16918",
  proceso: {
      codigo: "16",
      nombre: "REOGANIZACIÓN EMPRESARIAL Y CONCORDATOS"
  },
  documentos: [
      {
          extensiones: [
              {
                  codigo: "1",
                  nombre: "txt"
              }
          ],
          nombre: "Prueba",
          descripcion: "Prueba",
          documentoPrincipal: false,
          obligatorio: false
      }
  ],
  estado: true,
  funcionario: "1030691121 - RAMIRO HERNÁN GÓMEZ HORTA"
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

export const tiposSeguridad = [
  {
    codigo: "ABIERTA",
    nombre: "ABIERTA"
}
];
