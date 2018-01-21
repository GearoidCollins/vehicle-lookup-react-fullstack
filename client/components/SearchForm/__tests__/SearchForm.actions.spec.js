import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  SET_RECENT,
  LOADING,
  REG_REQ,
  REQ_ERROR,
  ANIMATE_RESULT_TOGGLE,
  getRecent,
  isLoading,
  requestError,
  animateRes,
} from '../SearchFormActions';

import vehicles from '../../../../config/mocks/vehicles.mock';

test(
  'should return the correct type loading',
  actionTest(isLoading, null, { type: LOADING })
);

test(
  'should return the correct type requestError',
  actionTest(requestError, 'error message', {
    type: REQ_ERROR,
    payload: 'error message',
  })
);

test(
  'should return the correct type animateRes',
  actionTest(animateRes, val => val, {
    type: ANIMATE_RESULT_TOGGLE,
  })
);

test(
  'should return the correct type getRecent',
  actionTest(getRecent(), null, { type: SET_RECENT, payload: vehicles })
);

// test(
//   'should return the correct type for deletePost',
//   actionTest(deletePost, post.cuid, { type: DELETE_POST, cuid: post.cuid })
// );

// test(
//   'should return the correct type for addPosts',
//   actionTest(addPosts, [post], { type: ADD_POSTS, posts: [post] })
// );
