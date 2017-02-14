import React from 'react';

const handleClick = () => {
  alert('click 1');
};

const Map = () => {
    return (
        <div>
            <button onClick={handleClick}>Btn</button>
        </div>
    );
};

export default Map;