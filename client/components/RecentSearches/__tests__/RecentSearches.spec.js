import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import RecentSearches from '../RecentSearches';

import vehicles from '../../../../config/mocks/vehicles.mock';

test('renders recent vehicles list', (t) => {
  const wrapper = shallow(<RecentSearches vehicles={vehicles} getRecentDis={() => {}} />);

  t.is(
    wrapper
      .find('h3')
      .first()
      .text(),
    'Recent searches',
  );
  t.is(wrapper.find('VehicleItem').length, 3);
});

test('renders message when no recent searches', (t) => {
  const wrapper = shallow(<RecentSearches vehicles={[]} getRecentDis={() => {}} />);

  t.is(
    wrapper
      .find('h3')
      .first()
      .text(),
    'No recent lookups...',
  );
});
