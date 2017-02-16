import React from 'react';

const handleClick = () => {
  alert('click 1');
};

const Map = (props) => {
    console.log(props);
    return (
        <div>
            <button className={props} onClick={handleClick}>Btn</button>
        </div>
    );
};

export default Map;