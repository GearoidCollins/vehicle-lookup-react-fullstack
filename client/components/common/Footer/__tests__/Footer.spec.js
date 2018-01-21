import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Footer from '..';

test('renders the footer properly', (t) => {
  const wrapper = shallow(<Footer />);

  t.is(
    wrapper
      .find('p')
      .first()
      .text(),
    '© 2018 · collins.ie · vrtme.ie',
  );
});
