import { get, isEmpty } from 'lodash';

export const ADD_EVENT = 'ADD_EVENT',
      DELETE_EVENT = 'DELETE_EVENT',
      ADD_DUPLICATED_EVENT = 'ADD_DUPLICATED_EVENT',
      ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS',
      ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE',
      DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS',
      DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

// event objet shape example:
// event: {
//   year: 2019,
//   month: 0, // 0 is January
//   date: 15,
//   hour: '1230',
//   data: {
//    name: "Event name",
//    type: "Solo",
//   }
// }

export const addEvent = (event) => (dispatch, getState) => {
    const { events } = getState();
    let newState = {...events};
    newState[event.year] = get(newState, [event.year], {});
    newState[event.year][event.month] = get(newState, [event.year, event.month], {});
    newState[event.year][event.month][event.date] = get(newState, [event.year, event.month, event.date], {});
    newState[event.year][event.month][event.date][event.hour] = {...event.data};

    // newState[event.year] = newState[event.year] ? {...newState[event.year]} : {};
    // newState[event.year][event.month] = newState[event.year][event.month] ? {...newState[event.year][event.month]} : {};
    // newState[event.year][event.month][event.date] = newState[event.year][event.month][event.date] ? {...newState[event.year][event.month][event.date]} : {};
    // newState[event.year][event.month][event.date][event.hour] = {...event.data};

    dispatch({
      type: ADD_EVENT,
      payload: newState,
    })
}

export const deleteEvent = event => (dispatch, getState) => {
  const { events } = getState();
  const newState = {...events};

  delete newState[event.year][event.month][event.date][event.hour];
  if (isEmpty(newState[event.year][event.month][event.date])) delete newState[event.year][event.month][event.date];
  if (isEmpty(newState[event.year][event.month])) delete newState[event.year][event.month];
  if (isEmpty(newState[event.year])) delete newState[event.year];
  if (isEmpty(newState[event.year])) delete newState[event.year];

  dispatch({
    type: DELETE_EVENT,
    payload: newState,
  })
}
