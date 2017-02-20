import React from 'react';
import { Link } from 'react-router';

import Map from '../components/map/Map';

const HomePage = () => {
    return (
        <div>
            Home page
            <Link to="/listing">Listing</Link>
            <Map />
        </div>
    );
};

export default HomePage;