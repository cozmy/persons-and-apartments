import {Router} from 'express';
import * as uniqid from 'uniqid';

const personIdPrefix = 'person-';
const personsRouter: Router = Router();

personsRouter
  .route('/persons/:id')
  .delete((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const person = database.get('persons').find({id}).value();

    if (person && person.id === id) {
      database.get('persons').remove({id}).write();

      res.json(person);
    } else {
      res.status(404).send('404 Not Found - The requested "Person" was not found.');
    }
  })
  .get((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const person = database.get('persons').find({id}).value();

    if (person && person.id === id) {
      res.json(person);
    } else {
      res.status(404).send('404 Not Found - The requested "Person" was not found.');
    }
  })
  .put((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const person = database.get('persons').find({id}).value();

    if (person && person.id === id) {
      const {firstName, lastName, money} = req.body;

      if (typeof firstName === 'string' && firstName.length > 0) {
        person.firstName = firstName;
      }

      if (typeof lastName === 'string' && lastName.length > 0) {
        person.lastName = lastName;
      }

      if (typeof money === 'number') {
        person.money = money;
      }

      database.get('persons').find({id}).assign(person).write();

      res.json(person);
    } else {
      res.status(404).send('404 Not Found - The requested "Person" was not found.');
    }
  });

personsRouter
  .route('/persons/')
  .get((req, res) => {
    const {database} = res.locals;
    const persons = database.get('persons');

    res.json(persons);
  })
  .post((req, res) => {
    const {firstName, lastName, money} = req.body;

    if (
      (typeof firstName === 'string' && firstName.length > 0) &&
      (typeof lastName === 'string' && lastName.length > 0) &&
      (typeof money === 'number')
    ) {
      const id = uniqid(personIdPrefix);
      const person = {firstName, id, lastName, money};

      const {database} = res.locals;
      database.get('persons').push(person).write();

      res.json(person);
    } else {
      res.status(400).send('400 Bad Request - Trying to create a "Person" with an incomplete payload.');
    }
  });

export {personsRouter};
