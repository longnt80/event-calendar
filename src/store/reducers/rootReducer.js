import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  modal: modalReducer,
});

export default rootReducer;
