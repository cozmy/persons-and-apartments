import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {apartmentsRouter} from './apartment/router';
import {authorizationHandler} from './authorization';
import {databaseHandler} from './database';
import {personsRouter} from './person/router';

// TODO both "apartment" and "person", as CRUD resoruces, share a lot of common code. Right now, it's copy-pasted!

// Build and configure the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authorizationHandler);
app.use(databaseHandler);

// Attach the routers
app.use('/api', apartmentsRouter);
app.use('/api', personsRouter);

// Generic error handler
app.use((err, req, res, next) => {
  const status = err instanceof SyntaxError ? 400 : 500;

  res.status(status).json({
    message: err.message,
    stack: err.stack
  });
});
app.all('*', (req, res) => {
  res.status(400).send('400 Bad Request - Invalid URL');
});

// Start the app at port 3000
app.listen(3000);
