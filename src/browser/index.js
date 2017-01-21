import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import {
    Router,
    applyRouterMiddleware,
    browserHistory as history
} from 'react-router';

import routerRelay from 'react-router-relay';

import routes from 'components/routes';


Relay.injectNetworkLayer (
    new Relay.DefaultNetworkLayer ('//localhost:9000/graphql')
);

ReactDOM.render(
    <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware (routerRelay)}
        environment={Relay.Store}/>,
    document.getElementById ('root')
);

require ('styles/styles.less');
