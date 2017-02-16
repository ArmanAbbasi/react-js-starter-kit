import React from 'react';
import Map from './components/Map';

const App = (props) => {
    console.log(props);
    return (
        <Map test={props.view}/>
    );
};

export default App;