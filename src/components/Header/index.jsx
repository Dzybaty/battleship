import React from 'react';
import PropTypes from 'prop-types';

import { GAME_PHASE } from '../../constants';
import { prettyPlayerName } from '../../utils';

import './styles.css';

const Header = ({
  gamePhase,
  player,
  playerHits,
  playerMisses,
  handleGameReset,
}) => {
  const renderGamePhaseInfo = () => {
    if (gamePhase === GAME_PHASE) {
      return (
        <>
          <span> Current turn: </span>
          <span className="contrast-text">{prettyPlayerName(player)}</span>
          <span> Hits: </span>
          <span className="contrast-text">{playerHits}</span>
          <span> Misses: </span>
          <span className="contrast-text">{playerMisses}</span>
          <span> Total shots: </span>
          <span className="contrast-text">{playerHits + playerMisses}</span>
        </>
      );
    }

    return null;
  };

  return (
    <div className="header">
      <div className="info-wrapper">
        <span>Phase: </span>
        <span className="contrast-text">{gamePhase}</span>
        {renderGamePhaseInfo()}
      </div>
      <div className="reset-button-wrapper">
        <button
          type="button"
          className="reset-button"
          onClick={handleGameReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  gamePhase: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  playerHits: PropTypes.number.isRequired,
  playerMisses: PropTypes.number.isRequired,
  handleGameReset: PropTypes.func.isRequired,
};

export default Header;
