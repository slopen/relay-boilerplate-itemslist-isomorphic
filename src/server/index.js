import graphql from './graphql';
import render from './render';

const GRAPHQL_PORT = 9000;
const HTTP_PORT = 8000;

render.listen (HTTP_PORT, () => {
    console.log (`* HTTP server is now running on http://localhost:${HTTP_PORT}`);
});

graphql.listen (GRAPHQL_PORT, () => {
    console.log (`* GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`);
});