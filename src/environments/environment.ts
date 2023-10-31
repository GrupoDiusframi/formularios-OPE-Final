export const environment = {
  //apiUrlBaseDev: 'http://192.168.195.208:8480/SSOC_OPE_Administracion_Tramites/',

  //apiUrlBaseDev: 'http://192.168.195.208:8480/SSOC_OPE_Administracion_Tramites/',
  apiUrlBaseDev: 'https://192.168.195.200:18643/SSOC_OPE_Administracion_Tramites/',

  //apiUrlBaseRadicar: 'http://192.168.195.208:8080/correspondencia-sgd-api/',
  //apiUrlBaseRadicar: 'https://192.168.195.208:8443/correspondencia-sgd-api/',
  apiUrlBaseRadicar: 'https://192.168.195.200:18443/correspondencia-sgd-api/',



  apiUrlBase: 'https://servicios.supersociedades.gov.co/',

  //apiCorrespondenciaUrlBase: 'https://192.168.195.208:8443/correspondencia-sgd-api/',
  apiCorrespondenciaUrlBase: 'https://192.168.195.200:18443/correspondencia-sgd-api/',


  //CORRESPODENCIA:'https://66.70.168.129:9443/correspondencia-sgd-api',
  CORRESPODENCIA: 'https://66.70.168.129:9443/correspondencia-sgd-api',


  //correspondenciaPrueba:'http://192.168.195.208:8080/correspondencia-sgd-api/',
  correspondenciaPrueba: 'https://192.168.195.200:18443/correspondencia-sgd-api/',


  //URLPRUEBA: 'http://192.168.195.208:8280/PQRSD/api/v1/',
  //URLPRUEBA: 'https://192.168.195.208:8280/PQRSD/api/v1/',
  URLPRUEBA: 'https://192.168.195.200:18543/PQRSD/api/v1/',



  component: 'formulario',
  username: 'BGONZALEZ',
  password: '8a2a4c86c1502d6df907259a04ec2354485da7059d3f37cbce54e713e44a3bed',
  authorizationPqrsdApi: 'Basic c3NvYy1wcXJzZDpDTEF2ZV8wOTg=',
  usuarioInstancia: 'cp4baadmindllo',
  claveInstancia: 'SD0cum3nt4ld',
  apiUrlInstanciarRadicacion: 'https://192.168.195.200:18543/PQRSD/api/v1/iniciarFormularioOpe',

  procedures: [
    { value: 5, name: 'Aprobación de colocación de acciones ordinarias', type: 'furt' },
    { value: 7, name: 'Aprobación de los estudios actuariales por pensiones de jubilación, bonos y/o títulos pensionales', type: 'furt' },
    { value: 1, name: 'Aprobación del avalúo de aportes en especie', type: 'furt' },
    { value: 10, name: 'Aprobación del estado financiero de inventario del patrimonio social', type: 'furt' },
    { value: 6, name: 'Autorización de solemnización de la reforma estatutaria', type: 'furt' },
    { value: 16, name: 'Autorización para colocación de acciones con dividendo preferencial y sin derecho a voto y colocación de acciones privilegiadas', type: 'furt' },
    { value: 9, name: 'Autorización para disminución de capital con efectivo reembolso de aportes', type: 'furt' },
    { value: 3, name: 'Autorización para el funcionamiento de una Sociedad Administradora de Planes de Autofinanciamiento Comercial', type: 'furt' },
    { value: 2, name: 'Autorización para la emisión privada de bonos', type: 'furt' },
    { value: 4, name: 'Autorización para la normalización del pasivo pensional', type: 'furt' },
    { value: 11, name: 'Convocatoria a reuniones extraordinarias de asamblea general de accionistas o junta de socios', type: 'furt' },
    { value: 12, name: 'Escisión de sociedades comerciales', type: 'furt' },
    { value: 8, name: 'Fusión de sociedades comerciales', type: 'furt' },
    { value: 14, name: 'Investigación para determinar situación de control o de grupo empresarial', type: 'furt' },
    { value: 15, name: 'Orden para reforma de las cláusulas o estipulaciones de los estatutos sociales que violen normas legales', type: 'furt' },
    { value: 17, name: 'Solicitud de investigación administrativa', type: 'furt' },
    { value: 19, name: 'Solicitud de investigación administrativa por captación ilegal', type: 'furt' },
    { value: 20, name: 'Denuncia soborno internacional', type: 'denuncia' }
  ],
  mediosEnvio: [
    { codigoMedioDeEnvio: 1, name: 'Email', type: 'furt' },
    { codigoMedioDeEnvio: 2, name: 'Correo Fisico', type: 'furt' },
  ]
}
