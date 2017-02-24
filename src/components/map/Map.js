import React from 'react';

import './map.scss';

const handleClick = () => {
  alert('click 1');
};

const Map = () => {
    return (
        <div className="map">
            <button className="map__button" onClick={handleClick}>Btn</button>
        </div>
    );
};

export default Map;