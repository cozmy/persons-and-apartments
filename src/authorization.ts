import {Handler} from 'express';

export const authorizationHandler: Handler = (req, res, next) => {
  const authorizationToken = req.header('Authorization');

  if (typeof authorizationToken === 'string' && authorizationToken.length > 0) {
    res.locals.authorizationToken = authorizationToken;

    next();
  } else {
    res.status(401).send('401 Unauthorized - The "Authorization" header is missing.');
  }
};
