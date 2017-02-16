import React from 'react';

const handleClick = () => {
  alert('click 1');
};

const Map = (props) => {
    return (
        <div>
            <button className={props.view} onClick={handleClick}>Btn</button>
        </div>
    );
};

export default Map;