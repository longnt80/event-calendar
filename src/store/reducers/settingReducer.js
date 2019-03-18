import { getMonth } from 'date-fns';
import {
  CHANGE_TO_NEXT_MONTH,
  CHANGE_TO_PREVIOUS_MONTH,
} from '../constants';

const initialState = {
  displayMonth: getMonth(new Date()),
}

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TO_NEXT_MONTH:
      return {
        displayMonth: action.month,
      }
    case CHANGE_TO_PREVIOUS_MONTH:
      return {
        displayMonth: action.month,
      }
    default:
      return state;
  }
}

export default settingReducer;
