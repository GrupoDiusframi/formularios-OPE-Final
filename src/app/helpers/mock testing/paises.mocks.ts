import { IPaises } from '../../models/TipoSocilicud';
import { faker } from '@faker-js/faker';

export function generateNPaises(quantity: number): IPaises[] {
  const resultado: IPaises[] = [];

  for (let i = 0; i < quantity; i++) {
    resultado.push({
      idPais: faker.random.numeric(),
      nombre: faker.address.cityName(),
    });
  }

  return resultado;
}
