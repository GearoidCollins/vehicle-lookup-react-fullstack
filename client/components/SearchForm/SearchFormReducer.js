import _ from 'lodash';

import {
  SET_RECENT,
  LOADING,
  REG_REQ,
  REQ_ERROR,
  ANIMATE_RESULT_TOGGLE,
  ADD_TO_RECENT,
} from './SearchFormActions';

const initialState = {
  recentSearches: [],
  loading: false,
  registration: '',
  result: {},
  error: '',
  animateResult: false,
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_REQ:
      return {
        ...state,
        loading: false,
        error: '',
        registration: '',
        result: { ...action.payload },
      };

    case REQ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: !state.loading,
        error: '',
      };

    case SET_RECENT:
      return {
        ...state,
        recentSearches: [...action.payload],
      };

    case ADD_TO_RECENT:
      return {
        ...state,
        recentSearches: _.unionBy(
          _.isEmpty(state.result) ? [] : [state.result],
          state.recentSearches,
          'registration',
        ),
      };

    case ANIMATE_RESULT_TOGGLE:
      return {
        ...state,
        animateResult: !state.animateResult,
      };

    default:
      return state;
  }
};

export default SearchReducer;
