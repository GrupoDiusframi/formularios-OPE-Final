import { ITipoSocilicud } from '../../models/TipoSocilicud';
import { faker } from '@faker-js/faker';

export function generateNTiposDeSolicitud(quantity: number): ITipoSocilicud[] {
  const resultado: ITipoSocilicud[] = [];

  for (let i = 0; i < quantity; i++) {
    resultado.push({
      id: faker.random.numeric(),
      descripcion: faker.random.alpha(),
      info: faker.random.alpha(),
    });
  }

  return resultado;
}
