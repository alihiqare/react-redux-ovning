import { combineReducers } from 'redux';
import counter from './reducers/counter';
import snackbars from './reducers/snackbarsReducer';

export default combineReducers({
  counter,
  snackbars
})