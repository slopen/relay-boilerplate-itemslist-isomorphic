import express from 'express';
import graphQLHTTP from 'express-graphql';


const GRAPHQL_PORT = 9000;

const {Schema} = require ('../../src/data/schema');
const app = express ();

app.use ('/', graphQLHTTP ({
	graphiql: true,
	pretty: true,
	schema: Schema
}));

app.listen (GRAPHQL_PORT, () => {
	console.log (`GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`);
});