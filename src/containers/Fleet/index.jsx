import React from 'react';
import Proptypes from 'prop-types';

import Ship from '../../components/Ship';

import ships from '../../constants';

import './styles.css';

const Fleet = ({ placedShips }) => {
  const isShipAlreadyPlaced = (shipId) => placedShips.includes(shipId);

  return (
    <div className="fleet-wrapper">
      {
        ships.map((ship) => (
          <div key={ship.id}>
            {ship.name}
            <Ship
              key={ship.id}
              id={ship.id}
              size={ship.size}
              isPlaced={isShipAlreadyPlaced(ship.id)}
            />
          </div>
        ))
      }
    </div>
  );
};

Fleet.propTypes = {
  placedShips: Proptypes.arrayOf(Proptypes.number).isRequired,
};

export default Fleet;
