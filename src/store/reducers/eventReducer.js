import {
  ADD_EVENT,
  DELETE_EVENT,
} from '../constants';

const initialState = {
  2019: {
    2: {
      13: {
        '0830': {name: "Ho longssdf dsdfsdfs asdasdasdas", type: "Solo"},
        '1000': {name: "Some event", type: "Company"},
        '1100': {name: "Anniversary", type: "Company"},
        '1130': {name: "Hampr", type: "Company"},
        '1300': {name: "Year End", type: "Company"},
        '1700': {name: "Something else", type: "Company"},
      },
      29: {
        '1100': {name: "Hey", type: "Solo"},
        '1230': {name: "Ha", type: "Team"}
      },
      30: {
        '0830': {name: "Ho longssdf dsdfsdfs asdasdasdas", type: "Solo"},
        '1000': {name: "Some event", type: "Company"},
        '1100': {name: "Anniversary", type: "Company"},
        '1130': {name: "Hampr", type: "Company"},
        '1300': {name: "Year End", type: "Company"},
        '1700': {name: "Something else", type: "Company"},
      },
    }
  }
};

const eventReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_EVENT:
      return {
        ...action.payload,
      }
    case DELETE_EVENT:
      return {
        ...action.payload,
      }
    default:
      return state;
  }
}

export default eventReducer;
