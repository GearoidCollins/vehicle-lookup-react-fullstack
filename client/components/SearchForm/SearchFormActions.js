import axios from 'axios';
import _ from 'lodash';

import config from '../../config';

export const SET_RECENT = 'SET_RECENT';
export const ADD_TO_RECENT = 'ADD_TO_RECENT';
export const REQ_ERROR = 'REQ_ERROR';
export const REG_REQ = 'REG_REQ';
export const LOADING = 'LOADING';
export const ANIMATE_RESULT_TOGGLE = 'ANIMATE_RESULT_TOGGLE';

export const requestError = error => ({
  type: REQ_ERROR,
  payload: error,
});

export const isLoading = () => ({
  type: LOADING,
});

export const animateRes = (dispatch) => {
  const send = {
    type: ANIMATE_RESULT_TOGGLE,
  };
  setTimeout(() => dispatch(send), 500);

  return dispatch(send);
};

export const postRegRequest = data => (dispatch) => {
  dispatch(isLoading());
  return axios
    .post(`${config.BASE_URL}${config.API.POST_REG}`, data)
    .then(({ data: payload }) => {
      animateRes(dispatch);
      dispatch({ type: ADD_TO_RECENT });
      dispatch({ type: REG_REQ, payload });
    })
    .catch(({ response }) => {
      const resp = _.get(response, 'data.message', '');
      return resp && dispatch(requestError(resp));
    });
};

export const getRecent = () => (dispatch) => {
  return axios
    .get(`${config.BASE_URL}${config.API.GET_RECENT}`)
    .then(({ data: payload }) => dispatch({ type: SET_RECENT, payload }))
    .catch(({ response }) => {
      const resp = _.get(response, 'data.message', '');
      return resp && dispatch(requestError(resp));
    });
};
