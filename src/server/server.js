import express from 'express';
import bodyParser from 'body-parser';
import graphQLHTTP from 'express-graphql';
import {graphqlBatchHTTPWrapper} from 'react-relay-network-layer';


const GRAPHQL_PORT = 9000;

const {Schema} = require ('../../src/data/schema');
const graphqlSettingsPerRequest = () => ({
    schema: Schema,
    graphiql: true,
    pretty: true
});

const app = express ();

const graphqlBatchMiddleware = graphqlBatchHTTPWrapper (
    graphQLHTTP ((req) => req.graphqlServerSettings)
);

app.use('/batch',
    bodyParser.json (),
    (req, res, next) => {
        req.graphqlServerSettings = graphqlSettingsPerRequest (req);
        graphqlBatchMiddleware (req, res, next);
    }
);

app.use ('/',
    graphQLHTTP (graphqlSettingsPerRequest)
);

app.listen (GRAPHQL_PORT, () => {
	console.log (`GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`);
});