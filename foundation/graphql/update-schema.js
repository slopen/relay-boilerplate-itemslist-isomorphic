#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import {Schema} from '../../src/data/schema';
import {graphql}  from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

const SCHEMA_PATH = path.resolve (__dirname, '../../src/data');

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
	const result = await (graphql (Schema, introspectionQuery));

	if (result.errors) {
		console.error(
			'ERROR introspecting schema: ',
			JSON.stringify (result.errors, null, 2)
		);
	} else {
		fs.writeFileSync(
			path.join (SCHEMA_PATH, 'schema.json'),
			JSON.stringify (result, null, 2)
		);
	}
}) ();

// Save user readable type system shorthand of schema
fs.writeFileSync (
	path.join (SCHEMA_PATH, 'schema.graphql'),
	printSchema (Schema)
);
