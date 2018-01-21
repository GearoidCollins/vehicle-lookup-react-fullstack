import { combineReducers } from 'redux';

// Import Reducers
import search from './components/SearchForm/SearchFormReducer';

// Intended to expand application state
export default combineReducers({
  search,
});
