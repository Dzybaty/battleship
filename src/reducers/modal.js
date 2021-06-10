import { OPEN_MODAL, CLOSE_MODAL, RESET_GAME } from '../actions';

const defaultState = {
  isShown: false,
  message: '',
  buttonText: '',
  modalType: '',
};

const modalsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      const { message, buttonText, modalType } = action;

      return {
        isShown: true,
        message,
        buttonText,
        modalType,
      };
    }

    case CLOSE_MODAL:
    case RESET_GAME: {
      return defaultState;
    }

    default: return state;
  }
};

export default modalsReducer;
