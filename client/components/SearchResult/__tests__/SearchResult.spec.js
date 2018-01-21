import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import SearchResult from '../SearchResult';

import vehicle from '../../../../config/mocks/vehicle.db.mock';

test('renders search result modal properly', (t) => {
  const wrapper = mount(<SearchResult vehicle={vehicle} loading={false} animateResult={false} />);

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

test('hide when vehicle is empty object', (t) => {
  const wrapper = shallow(<SearchResult vehicle={vehicle} loading={false} animateResult={false} />);

  wrapper.setProps({ vehicle: {} });
  t.is(wrapper.find('VehicleItem').length, 0);
});

test('has correct props', (t) => {
  const wrapper = mount(<SearchResult vehicle={vehicle} loading={false} animateResult={false} />);

  t.deepEqual(wrapper.prop('vehicle'), vehicle);
  t.is(wrapper.prop('make'), vehicle.make);
});
