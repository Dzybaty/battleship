import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Cell from '../../components/Cell';

import { placeShip, makeShot } from '../../actions';
import { GAME_PHASE } from '../../constants';
import { checkIfShipFits } from '../../utils';

import './styles.css';

const Field = ({
  currentPlayer,
  gamePhase,
  field,
  isEnemyField,
}) => {
  const dispatch = useDispatch();

  const handleCellDrop = (ship, positionX, positionY) => {
    const { id, size } = ship;
    if (checkIfShipFits(positionX, positionY, size, field)) {
      dispatch(placeShip({
        shipId: id,
        positionX,
        positionY,
        size,
        currentPlayer,
      }));
    }
  };

  const handleCellClick = (event, x, y) => {
    // Prevent click action if it is wrong phase or player trying to click on his own field
    if (gamePhase !== GAME_PHASE || !isEnemyField) {
      return;
    }

    dispatch(makeShot(currentPlayer, { x, y }));
  };

  return (
    <div className="field-wrapper">
      <div>
        { `${isEnemyField ? 'Enemy' : 'Your'} field:` }
      </div>
      <div className="field-box">
        {
          field.map((row, i) => {
            const cells = row.map((cell) => (
              <Cell
                key={`${cell.positionX}${cell.positionY}`}
                data={cell}
                gamePhase={gamePhase}
                isEnemyCell={isEnemyField}
                handleDrop={handleCellDrop}
                handleClick={handleCellClick}
              />
            ));

            return (
              <React.Fragment key={row[i].positionX}>
                {cells}
              </React.Fragment>
            );
          })
        }
      </div>
    </div>
  );
};

Field.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  gamePhase: PropTypes.string.isRequired,
  isEnemyField: PropTypes.bool.isRequired,
  field: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ).isRequired,
};

export default Field;
