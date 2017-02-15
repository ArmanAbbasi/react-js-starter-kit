import React from 'react';

const handleClick = () => {
    alert('click 1');
};

const Listing = () => {
    return (
        <div>
            <button onClick={handleClick}>Listing</button>
        </div>
    );
};

export default Listing;