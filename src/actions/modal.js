export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = (modalType, message, buttonText) => ({
  type: OPEN_MODAL,
  modalType,
  message,
  buttonText,
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });
