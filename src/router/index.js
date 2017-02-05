let ReactDOMServer = require('react-dom/server');
let React = require('react');

let App = React.createFactory(require('../App'));

/**
 * Registering our routes
 * */
module.exports = (app) => {
    app.get('/', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(App({}));
        res.render('index.ejs', { reactOutput: reactHtml });
    });
};