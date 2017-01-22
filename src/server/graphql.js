import express from 'express';
import bodyParser from 'body-parser';
import graphQLHTTP from 'express-graphql';
import {graphqlBatchHTTPWrapper} from 'react-relay-network-layer';


const {schema} = require ('../../src/data/schema');

const graphqlSettingsPerRequest = () => ({
    schema,
    graphiql: true,
    pretty: true
});

const graphqlBatchMiddleware = graphqlBatchHTTPWrapper (
    graphQLHTTP ((req) => req.graphqlServerSettings)
);


export default express ()
    .use('/batch',
        bodyParser.json (),
        (req, res, next) => {
            req.graphqlServerSettings = graphqlSettingsPerRequest (req);
            graphqlBatchMiddleware (req, res, next);
        }
    )
    .use ('/graphql',
        graphQLHTTP (graphqlSettingsPerRequest)
    )