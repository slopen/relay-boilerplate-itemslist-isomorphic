import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import ReactDOMServer from 'react-dom/server';
import IsomorphicRouter from 'isomorphic-relay-router';
import RelayLocalSchema from 'relay-local-schema';

import {match} from 'react-router';

import routes from 'components/routes';
import {schema} from 'data/schema';
import Html from 'html';


const STATIC_PATH = path.resolve (process.cwd (), 'build/client');
const networkLayer = new RelayLocalSchema.NetworkLayer ({schema});

export default express ()
	.use (
		bodyParser.json ()
	)
	.use (
		express.static (STATIC_PATH)
	)
	.use ('*', (req, res, next) => {

		const render = ({data, props}) => {
			const output = ReactDOMServer.renderToString (
				IsomorphicRouter.render (props)
			);

			res.send (Html (output, data));
		};

		match ({routes, location: req.originalUrl}, (error, redirect, props) => {
			if (error) {

				next (error);

			} else if (redirect) {

				res.redirect (302, redirect.pathname + redirect.search);

			} else if (props) {

				IsomorphicRouter
					.prepareData (props, networkLayer)
					.then (render)
					.catch (next);

			} else {

				res.status (404).send ('Not Found');
			}
		});

	})
