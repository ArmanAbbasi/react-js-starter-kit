import React from 'react';

const handleClick = () => {
    alert('click 1');
};

const HomePage = () => {
    return (
        <div>
            <button onClick={handleClick}>HomePage</button>
        </div>
    );
};

export default HomePage;