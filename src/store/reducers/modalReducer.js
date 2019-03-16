const initialState = {
  isOpen: false,
  dayForModalForm: null,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        dayForModalForm: action.day,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state;
  }
}

export default modalReducer;
