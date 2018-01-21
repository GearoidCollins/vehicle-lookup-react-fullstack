import test from 'ava';

import { promiseUtil } from '..';

const itemData = [{ test: 'test' }];

test('promise util executes correctly', async (t) => {
  const resolvedPromises = await promiseUtil(itemData, res => Promise.resolve(res));

  t.deepEqual([{ test: 'test' }], resolvedPromises);
  t.deepEqual(itemData, []);
});
