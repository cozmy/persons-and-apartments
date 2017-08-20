import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {databaseConnector, databaseName} from './database';
import {authorizationHandler} from './authorization';
import {personsRouter} from './person/index';

// Set some defaults if the JSON is empty
databaseConnector(databaseName).defaults({persons: [], apartments: []}).write();

// Build and configure the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authorizationHandler);

// Attach the routers
app.use('/api', personsRouter);

// Start the app at port 3000
app.listen(3000);
