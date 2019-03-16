const initialState = {
  isOpen: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        component: action.component,
        props: {...action.props}
      }
    case 'CLOSE_MODAL':
      return {
        isOpen: false,
      }
    default:
      return state;
  }
}

export default modalReducer;
