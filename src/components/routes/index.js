import React from 'react';
import Relay from 'react-relay';
import {Route, IndexRoute} from 'react-router';

import App from 'components/app';
import Item from 'components/content/item/full';
import ItemsList from 'components/content/item/list';
import Tag from 'components/content/tag/full';
import TagsList from 'components/content/tag/list';


const viewerQueries = {
    viewer: () => Relay.QL`
        query {
            viewer
        }
    `
};

export default (
    <Route
        path="/"
        component={App}
        queries={viewerQueries}>

        <IndexRoute
            component={ItemsList}
            queries={viewerQueries}/>

        <Route
            path="item"
            component={ItemsList}
            queries={viewerQueries}>
        </Route>

        <Route
            path="item/:id"
            component={Item}
            queries={viewerQueries}/>

        <Route
            path="tag"
            component={TagsList}
            queries={viewerQueries}/>

        <Route
            path="tag/:id"
            component={Tag}
            queries={viewerQueries}/>

    </Route>
);