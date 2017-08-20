import {Handler} from 'express';

const low = require('lowdb');
const inProduction = process.env.NODE_ENV === 'production';
const getDatabaseName = (databaseSuffix) => `.${(inProduction ? '/dbs' : '/dist')}/db-${databaseSuffix}.json`;

export const databaseHandler: Handler = (req, res, next) => {
  const database = low(getDatabaseName(res.locals.authorizationToken));

  // Set some defaults if the JSON is empty
  database.defaults({persons: [], apartments: []}).write();

  res.locals.database = database;

  next();
};
