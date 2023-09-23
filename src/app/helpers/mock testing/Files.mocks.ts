import { faker } from '@faker-js/faker';
import { ISubirArchivo } from '../../models/ISubirArchivo';

export function generateNArchivos(quantity: number): ISubirArchivo[] {
  const resultado: ISubirArchivo[] = [];

  for (let i = 0; i < quantity; i++) {
    resultado.push({
      archivo: faker.random.alphaNumeric(),
      extension: faker.random.alphaNumeric(),
      radicacion: faker.random.alphaNumeric(),
      tipoDocumento: faker.random.alphaNumeric(),
      uploadBy: faker.random.alphaNumeric(),
      nombre: faker.random.alphaNumeric(),
      tamanio: faker.random.alphaNumeric(),
    });
  }

  return resultado;
}
