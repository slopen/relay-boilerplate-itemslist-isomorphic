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

const onEnter = (nextState, replace, callback) => {
    if (typeof window !== 'undefined') {
        // clientside

        callback ();
    } else {
        // serverside

        callback ();
    }
}


export default (
    <Route
        path="/"
        component={App}
        onEnter={onEnter}
        queries={viewerQueries}>

        <IndexRoute
            component={ItemsList}
            onEnter={onEnter}
            queries={viewerQueries}/>

        <Route
            path="item"
            component={ItemsList}
            onEnter={onEnter}
            queries={viewerQueries}>
        </Route>

        <Route
            path="item/:id"
            component={Item}
            onEnter={onEnter}
            queries={viewerQueries}/>

        <Route
            path="tag"
            component={TagsList}
            onEnter={onEnter}
            queries={viewerQueries}/>

        <Route
            path="tag/:id"
            component={Tag}
            onEnter={onEnter}
            queries={viewerQueries}/>

    </Route>
);