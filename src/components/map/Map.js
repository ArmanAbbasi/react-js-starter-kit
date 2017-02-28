import React from 'react';

import './map.scss';

const handleClick = () => {
  alert('click 1');
};

const Map = () => {
    return (
        <div className="map">
            <button className="map__button" onClick={handleClick}>Btn 3</button>
        </div>
    );
};

export default Map;