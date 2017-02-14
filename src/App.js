import React from 'react';
import Map from './components/Map';

// const App = (props) => (
//     <div className="{this.props}">
//         <Map/>
//     </div>
// );

class App extends React.Component {
    componentDidMount() {
        console.log('mounted');
    }

    handleClick() {
        alert('clicked');
    }

    render() {
        return (
            <Map/>
        );
    }
}

export default App;