import { faker } from '@faker-js/faker';

export function generateNMunicipios(quantity: number): any[] {
  const resultado: any[] = [];

  for (let i = 0; i < quantity; i++) {
    resultado.push({
      id: faker.random.numeric(),
      descripcion: faker.address.cityName(),
    });
  }

  return resultado;
}
