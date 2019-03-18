import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  modal: modalReducer,
  setting: settingReducer,
});

export default rootReducer;
