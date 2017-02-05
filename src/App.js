let React = require('react');
let Map = require('./components/Map');

const App = React.createClass({
    render () {
        return (
            <div>
                <Map/>
            </div>
        );
    }
});

module.exports = App;