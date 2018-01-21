import test from 'ava';

import { formatVrtme } from '..';
import vehiclesMock from '../../../config/mocks/vehicles.mock';

const expectedData = {
  make: 'Audi',
  model: 'A5',
  variant: 'T Fsi Sport 6Sp',
  fuel_type: 'Petrol',
  engine_capacity: '1.8',
  year: 2008,
  month: 2,
  milage: 0,
};

test('format vrtme create correct object', (t) => {
  const vehicle = vehiclesMock[0];

  t.deepEqual(formatVrtme(vehicle), expectedData);
});
