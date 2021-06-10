import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import PlayerView from './containers/PlayerView';
import Modal from './components/Modal';

import {
  gamePhaseSelector,
  currentPlayerSelector,
  modalConfigSelector,
  playerMissesSelector,
  playerHitsSelector,
} from './selectors';

import {
  changeGamePhase, nextPlayerTurn, closeModal, resetGame,
} from './actions';

const App = () => {
  const dispatch = useDispatch();
  const gamePhase = useSelector((state) => gamePhaseSelector(state));
  const player = useSelector((state) => currentPlayerSelector(state));
  const modalConfig = useSelector((state) => modalConfigSelector(state));
  const playerHits = useSelector((state) => playerHitsSelector(state, player));
  const playerMisses = useSelector((state) => playerMissesSelector(state, player));

  const handleGamePhaseChange = () => {
    dispatch(changeGamePhase());
    dispatch(closeModal());
  };

  const handleNextPlayerTurn = () => {
    dispatch(nextPlayerTurn(player));
    dispatch(closeModal());
  };

  const handleGameReset = () => {
    dispatch(resetGame());
  };

  return (
    <>
      <Header
        gamePhase={gamePhase}
        player={player}
        handleGameReset={handleGameReset}
        playerHits={playerHits}
        playerMisses={playerMisses}
      />
      <PlayerView />
      <Modal
        modalConfig={modalConfig}
        handleGamePhaseChange={handleGamePhaseChange}
        handleNextPlayerTurn={handleNextPlayerTurn}
        handleGameReset={handleGameReset}
      />
    </>
  );
};

export default App;
