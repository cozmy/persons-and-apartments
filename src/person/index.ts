import {Router} from 'express';
import {personsPersistence} from './crud';

const personsRouter = Router();

personsRouter
  .route('/persons/:id?')
  .delete((req, res) => {
    res.json(personsPersistence['delete'](req.params.id));
  })
  .get((req, res) => {
    res.json(personsPersistence.read(req.params.id));
  })
  .post((req, res) => {
    res.json(personsPersistence.create(req.body));
  })
  .put((req, res) => {
    res.json(personsPersistence.update(req.params.id, req.body));
  });

export {personsRouter};
