// This is the only one modal template used by 3 actual modals
// It gets own configuration and handles 3 actions
import React from 'react';
import PropTypes from 'prop-types';

import { MODAL_ENDGAME, MODAL_NEXT_PHASE, MODAL_NEXT_TURN } from '../../constants';

import './styles.css';

const Modal = ({
  modalConfig: {
    isShown,
    modalType,
    message,
    buttonText,
  },
  handleGamePhaseChange,
  handleNextPlayerTurn,
  handleGameReset,
}) => {
  const setClickHandlerByModalType = () => {
    switch (modalType) {
      case MODAL_NEXT_PHASE: {
        return handleGamePhaseChange;
      }

      case MODAL_NEXT_TURN: {
        return handleNextPlayerTurn;
      }

      case MODAL_ENDGAME: {
        return handleGameReset;
      }

      default: return null;
    }
  };

  const renderModal = () => (
    <div className="next-player-modal">
      <div className="message-box">
        {message}
        <button
          type="button"
          className="proceed-button"
          onClick={setClickHandlerByModalType()}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  if (isShown) {
    return renderModal();
  }

  return null;
};

Modal.propTypes = {
  modalConfig: PropTypes.shape({
    isShown: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
  }),

  handleGamePhaseChange: PropTypes.func.isRequired,
  handleNextPlayerTurn: PropTypes.func.isRequired,
  handleGameReset: PropTypes.func.isRequired,
};

export default Modal;
