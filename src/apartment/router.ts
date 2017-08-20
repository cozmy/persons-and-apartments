import {Router} from 'express';
import * as uniqid from 'uniqid';

const apartmentIdPrefix = 'apartment-';
const apartmentsRouter: Router = Router();

apartmentsRouter
  .route('/apartments/:id')
  .delete((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const apartment = database.get('apartments').find({id}).value();

    if (apartment && apartment.id === id) {
      database.get('apartments').remove({id}).write();

      res.json(apartment);
    } else {
      res.status(404).send('404 Not Found - The requested "Apartment" was not found.');
    }
  })
  .get((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const apartment = database.get('apartments').find({id}).value();

    if (apartment && apartment.id === id) {
      res.json(apartment);
    } else {
      res.status(404).send('404 Not Found - The requested "Apartment" was not found.');
    }
  })
  .put((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const apartment = database.get('apartments').find({id}).value();

    if (apartment && apartment.id === id) {
      const {cost, owners} = req.body;

      if (typeof cost === 'number') {
        apartment.cost = cost;
      }

      if (Array.isArray(owners)) {
        apartment.owners = owners;
      }

      database.get('apartments').find({id}).assign(apartment).write();

      res.json(apartment);
    } else {
      res.status(404).send('404 Not Found - The requested "Apartment" was not found.');
    }
  });

apartmentsRouter
  .route('/apartments/')
  .get((req, res) => {
    const {database} = res.locals;
    const apartments = database.get('apartments');

    res.json(apartments);
  })
  .post((req, res) => {
    const {cost} = req.body;

    if (
      (typeof cost === 'number')
    ) {
      const id = uniqid(apartmentIdPrefix);
      const apartment = {cost, id, owners: []};

      const {database} = res.locals;
      database.get('apartments').push(apartment).write();

      res.json(apartment);
    } else {
      res.status(400).send('400 Bad Request - Trying to create an "Apartment" with an incomplete payload.');
    }
  });

export {apartmentsRouter};
