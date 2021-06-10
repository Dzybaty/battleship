import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { GAME_PHASE } from '../../constants';

import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';
import { ReactComponent as DotIcon } from '../../assets/icons/dot.svg';

import './styles.css';

const Cell = ({
  gamePhase,
  isEnemyCell,
  data: {
    positionX,
    positionY,
    shipId,
    isAdjacent,
    isHitAndMissed,
    isHitAndDamaged,
  },
  handleClick,
  handleDrop,
}) => {
  const isOccupied = !!shipId;

  const [, drop] = useDrop(() => ({
    accept: 'ship',
    drop: (ship) => handleDrop(ship, positionX, positionY),
  }), [positionX, positionY, handleDrop]);

  // Generating styles visualizing ships on the field due Preparation Phase
  const generateCellStyle = () => {
    if (!isEnemyCell) {
      return `cell ${isOccupied ? 'occupied' : ''}`;
    }

    return 'cell hidden';
  };

  // Generating icons visualizing hit points on the field due Game Phase
  const generateCellIcon = () => {
    if (gamePhase === GAME_PHASE) {
      if (isHitAndDamaged) {
        return (<CrossIcon />);
      }

      if (isHitAndMissed) {
        return (<DotIcon />);
      }
    }

    return null;
  };

  return (
    <button
      type="button"
      ref={isOccupied || isAdjacent ? null : drop}
      className={generateCellStyle()}
      onClick={(e) => handleClick(e, positionX, positionY)}
    >
      {generateCellIcon()}
    </button>
  );
};

Cell.propTypes = {
  gamePhase: PropTypes.string.isRequired,
  isEnemyCell: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    shipId: PropTypes.number,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    isAdjacent: PropTypes.bool,
    isHitAndMissed: PropTypes.bool,
    isHitAndDamaged: PropTypes.bool,
  }),
  handleClick: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  data: PropTypes.shape({
    shipId: null,
    isAdjacent: false,
    isHitAndMissed: false,
    isHitAndDamaged: false,
  }),
};

export default Cell;
