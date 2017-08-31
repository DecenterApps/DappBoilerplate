import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

export default combineReducers({
  routing: routerReducer,
  counter: counterReducer
});
