import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import VehicleItem from '../VehicleItem';

import vehicle from '../../../../config/mocks/vehicle.db.mock';
import vehicles from '../../../../config/mocks/vehicles.mock';

test('renders vehicle item properly', (t) => {
  const wrapper = shallow(<VehicleItem {...vehicle} />);

  t.is(
    wrapper
      .find('h6')
      .first()
      .text(),
    `${vehicle.manufacturer} - ${vehicle.model}`,
  );
  t.is(
    wrapper
      .find('.titleCon')
      .children()
      .first()
      .text(),
    vehicle.registration,
  );
});

test('has correct props', (t) => {
  const wrapper = mount(<VehicleItem {...vehicle} />);

  t.is(wrapper.prop('registration'), vehicle.registration);
  t.is(wrapper.prop('make'), vehicle.make);
});
test('missing vrt calculations', (t) => {
  const wrapper = mount(<VehicleItem {...vehicles[2]} />);

  t.is(wrapper.prop('vrt'), null);
  t.is(wrapper.prop('make'), vehicle.make);
});
