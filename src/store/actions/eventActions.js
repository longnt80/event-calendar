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

export const addEvent = (event) => {
  return (dispatch, getState) => {
    const { events } = getState();
    let newState = {...events};
    newState[event.year] = newState[event.year] ? {...newState[event.year]} : {};
    newState[event.year][event.month] = newState[event.year][event.month] ? {...newState[event.year][event.month]} : {};
    newState[event.year][event.month][event.date] = newState[event.year][event.month][event.date] ? {...newState[event.year][event.month][event.date]} : {};
    newState[event.year][event.month][event.date][event.hour] = newState[event.year][event.month][event.date][event.hour] ? {...newState[event.year][event.month][event.date][event.hour]} : {...event.data};

    dispatch({
      type: ADD_EVENT,
      payload: newState,
    })
  }
}

export const deleteEvent = (event) => {
  return (dispatchEvent, getState) => {
    const currentState = getState();

    console.log(currentState);
  }
}
