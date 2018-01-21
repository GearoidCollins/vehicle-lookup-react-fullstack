import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import HeaderText from '../HeaderText';

test('renders the header text properly', (t) => {
  const wrapper = shallow(<HeaderText />);

  t.is(
    wrapper
      .find('h2')
      .first()
      .text(),
    'UK DVLA VRT Lookup',
  );
  t.is(
    wrapper
      .find('p')
      .first()
      .text(),
    'Enter a valid UK Vehicle registration number and get a free vehicle history check and VRT(Vehicle Road Tax) estimate.',
  );
});
