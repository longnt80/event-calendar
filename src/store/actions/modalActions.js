export const openModal = (component, props) => {
  // Check if component is valid React component or element
  return {
    type: 'OPEN_MODAL',
    component,
    props,
  }
}
export const closeModal = () => ({
  type: 'CLOSE_MODAL',
})
export const closeTheModal = () => ({
  type: 'CLOSE_MODAL',
})
