# Relay / Graphql Connections/Mutations Isomorphic Boilerplate

Based on [relay-starter-kit](https://github.com/relayjs/relay-starter-kit)

RANGE_ADD / RANGE_DELETE / NODE_DELETE / FIELDS_CHANGE examples

CSS / LESS / fonts / images webpack loaders


[extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) -
extract CSS as separate file


[DllPlugin](https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin) -
keep rarely updated dependencies in vendor.js file

[react-relay-network-layer](https://github.com/nodkz/react-relay-network-layer) - batch Relay queries

[isomorphic-relay-router](https://github.com/denvned/isomorphic-relay-router) - isomorphic rendering


## Init

```
git clone https://github.com/slopen/relay-boilerplate-itemslist-isomorphic
cd relay-boilerplate-itemslist-isomorphic
npm i
```

## Start GraphQL & Isomorphic Render server

```
npm run server
```

http://localhost:9000 GraphQL endpoint
http://localhost:8000 Isomorphic html / static


## Start Client (webpack-dev-server)

```
npm run dev
```

http://localhost:8080