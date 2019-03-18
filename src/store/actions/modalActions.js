import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../constants';

export const openModal = (component, props) => {
  return {
    type: OPEN_MODAL,
    component,
    props,
  }
}

export const closeModal = () => ({
  type: CLOSE_MODAL,
})
