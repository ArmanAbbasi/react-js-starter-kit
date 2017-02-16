let  getRoutes = require('./router');
let  ReactDOMServer = require('react-dom');
let  { match } = require('react-router');
let  { ReduxAsyncConnect, loadOnServer } = require('redux-async-connect');

const store = {};

module.exports = (req, res) => {
    function hydrateOnClient() {
        let reactHtml = ReactDOMServer.renderToString(<App component={component}/>);
        res.render('index', {reactOutput: reactHtml});
    }

    match({
        history,
        routes: getRoutes(store),
        location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500);
            hydrateOnClient();
        } else if (renderProps) {
            loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect {...renderProps} />
                    </Provider>
                );

                res.status(200);

                global.navigator = {userAgent: req.headers['user-agent']};

                let reactHtml = ReactDOMServer.renderToString(<App component={component}/>);
                res.render('index', {reactOutput: reactHtml});
            });
        } else {
            res.status(404).send('Not found');
        }
    });
};