import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Field from '../Field';
import Fleet from '../Fleet';

import {
  currentPlayerSelector, fieldSelector, gamePhaseSelector, placedShipsSelector,
} from '../../selectors';

import { switchPlayer } from '../../utils';

import './styles.css';
import { GAME_PHASE } from '../../constants';

const PlayerView = () => {
  const currentPlayer = useSelector((state) => currentPlayerSelector(state));
  const gamePhase = useSelector((state) => gamePhaseSelector(state));
  const playerField = useSelector((state) => fieldSelector(state, currentPlayer));
  const enemyField = useSelector((state) => fieldSelector(state, switchPlayer(currentPlayer)));
  const placedShips = useSelector((state) => placedShipsSelector(state, currentPlayer));

  const renderEnemyField = () => {
    if (gamePhase === GAME_PHASE) {
      return (
        <Field
          currentPlayer={currentPlayer}
          gamePhase={gamePhase}
          field={enemyField}
          isEnemyField
        />
      );
    }

    return null;
  };

  const renderPlayerFleet = () => {
    if (gamePhase !== GAME_PHASE) {
      return (<Fleet placedShips={placedShips} />);
    }

    return null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="player-view">
        <Field
          currentPlayer={currentPlayer}
          gamePhase={gamePhase}
          field={playerField}
          isEnemyField={false}
        />
        {/* These 2 functions are split just for easier logical understanding */}
        {renderEnemyField()}
        {renderPlayerFleet()}
      </div>
    </DndProvider>
  );
};

export default PlayerView;
