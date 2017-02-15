import React from 'react';
import Map from './components/Map';

export default class App extends React.Component {
    componentDidMount() {
        console.log('mounted');
        console.log(this);
    }

    render() {
        return (
            <Map/>
        );
    }
}