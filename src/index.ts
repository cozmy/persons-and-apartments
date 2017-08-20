import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {authorizationHandler} from './authorization';
import {databaseHandler} from './database';
import {personsRouter} from './person/index';

// Build and configure the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authorizationHandler);
app.use(databaseHandler);

// Attach the routers
app.use('/api', personsRouter);

// Start the app at port 3000
app.listen(3000);
