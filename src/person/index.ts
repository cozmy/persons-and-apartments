import {Router} from 'express';
import {personsPersistence} from './crud';

const personsRouter = Router();

personsRouter
  .route('/persons/:id?')
  .delete((req, res) => {
    res.json(personsPersistence['delete'](res.locals.database, req.params.id));
  })
  .get((req, res) => {
    res.json(personsPersistence.read(res.locals.database, req.params.id));
  })
  .post((req, res) => {
    res.json(personsPersistence.create(res.locals.database, req.body));
  })
  .put((req, res) => {
    res.json(personsPersistence.update(res.locals.database, req.params.id, req.body));
  });

export {personsRouter};
