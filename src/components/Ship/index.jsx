import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import './styles.css';

const Ship = ({ id, size, isPlaced }) => {
  const [, drag] = useDrag(() => ({
    type: 'ship',
    item: { id, size },
  }));

  // This function is needed for proper key creation in return method
  const constructShip = () => {
    const ship = [];
    for (let i = 0; i < size; i += 1) {
      ship.push(i);
    }

    return ship;
  };

  return (
    // Disable drag'n'drop if it was already placed
    <div ref={isPlaced ? null : drag} className={`ship-wrapper ${isPlaced ? 'placed' : ''}`}>
      {
        constructShip().map((e) => (
          <div key={e} className="ship-block" />
        ))
      }
    </div>
  );
};

Ship.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  isPlaced: PropTypes.bool.isRequired,
};

export default Ship;
