import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Home from '../Home';
import vehicles from '../../../../config/mocks/vehicles.mock';

import styles from '../home.scss';

const state = {
  search: {
    result: {},
    loading: false,
    animateResult: false,
    vehicles,
    getRecentDis: sinon.spy(),
  },
};
const context = {
  store: {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state,
  },
};

test('renders properly', (t) => {
  const wrapper = shallow(<Home />, { context }).dive();
  t.is(wrapper.find('.homeCon > div'), 2);
  // t.is(wrapper.find('Header').length, 1);
  // t.is(wrapper.find('Footer').length, 1);

  t.truthy(wrapper
    .find('.homeCon > div')
    .get(0)
    .hasClass(styles.viewPort));
  t.truthy(wrapper
    .find('.homeCon > div')
    .get(1)
    .hasClass(styles.recentSearchesCon));
  // t.truthy(wrapper.find('Header + div').children(), children);
});

test('calls request vehicle data with registration', (t) => {
  const wrapper = mount(<Home search={state} />, { context });
  // wrapper.setProps({ registration: 'tk04kal' });

  wrapper
    .find('button')
    .first()
    .simulate('click');

  t.is(wrapper.find('input').prop('defaultValue'), 'tk04kal');
});
