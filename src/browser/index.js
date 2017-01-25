import React from 'react';
import ReactDOM from 'react-dom';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import match from 'react-router/lib/match';
import history from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router';

import IsomorphicRouter from 'isomorphic-relay-router';

import NetworkLayer from './network';
import routes from 'components/routes';

const preloadedData = document.getElementById ('preloadedData');
const rootElement = document.getElementById ('root');

const environment = new Relay.Environment ();

environment.injectNetworkLayer (NetworkLayer);

if (preloadedData) {
    const textContent = preloadedData.textContent;
    const data = textContent ? JSON.parse (textContent) : [];

    IsomorphicRelay.injectPreparedData (environment, data);
}

match ({
    history,
    routes
}, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender (environment, renderProps).then ((props) => {
        ReactDOM.render(<Router {...props}/>, rootElement)
    });
});

require ('styles/styles.less');
