import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import SearchForm from '../SearchForm';

const state = {
  search: {
    loading: false,
    postReg: sinon.spy(),
    requestErrorDis: sinon.spy(),
    error: false,
  },
};
const context = {
  store: {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state,
  },
};

test('calls request vehicle data with registration', (t) => {
  const wrapper = mount(<SearchForm />, { context });

  wrapper.setProps({ registration: 'tk04kal' });
  wrapper.instance().sendRequest();
  wrapper
    .find('button')
    .first()
    .simulate('click');

  t.is(wrapper.find('input').prop('defaultValue'), 'tk04kal');
});

test('calls request vehicle data w', (t) => {
  const wrapper = shallow(<SearchForm />, { context }).dive();
  wrapper.setProps({ error: 'Invalid registration' });
  t.is(
    wrapper
      .find('button + div')
      .first()
      .text(),
    'Invalid registration',
  );
});

test('loader displayed when in loading state', (t) => {
  const wrapper = shallow(<SearchForm />, { context }).dive();

  t.is(
    wrapper
      .find('button span')
      .first()
      .text(),
    'Get',
  );

  wrapper.setProps({ loading: true });

  t.is(
    wrapper
      .find('button span')
      .first()
      .text(),
    '',
  );
});
