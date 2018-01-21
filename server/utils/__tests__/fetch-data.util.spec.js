import test from 'ava';

import { fetchData } from '..';

const store = {
  dispatch: res => Promise.resolve(res),
  getState: () => ({ test: 'test' }),
};
const components = [
  {
    need: [(parmas, res) => res],
    WrappedComponent: { need: [(parmas, res) => res] },
  },
  { WrappedComponent: {} },
  { WrappedComponent: { need: [(parmas, res) => res] } },
  { need: [(parmas, res) => res] },
];
const params = {};
const expectedResult = [
  { test: 'test' },
  { test: 'test' },
  { test: 'test' },
  { test: 'test' },
];

test('promise util executes correctly', async (t) => {
  const resolvedPromises = await fetchData(store, components, params);

  t.deepEqual(resolvedPromises, expectedResult);
});
