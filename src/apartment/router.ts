import {Router} from 'express';
import * as uniqid from 'uniqid';
import {IApartment} from './interface';

const apartmentIdPrefix = 'apartment-';
const apartmentsRouter: Router = Router();

apartmentsRouter
  .route('/apartments/:id')
  .delete((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const apartment: IApartment = database.get('apartments').find({id}).value();

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
    const apartment: IApartment = database.get('apartments').find({id}).value();

    if (apartment && apartment.id === id) {
      res.json(apartment);
    } else {
      res.status(404).send('404 Not Found - The requested "Apartment" was not found.');
    }
  })
  .put((req, res) => {
    const {database} = res.locals;
    const {id} = req.params;
    const apartment: IApartment = database.get('apartments').find({id}).value();

    if (apartment && apartment.id === id) {
      const {ownerId} = req.body;

      // TODO this is not OK at all, but for the pure sake of speed, I'll write it anyway!
      // 4 levels of IFs, wow! such simple, much clean code!
      if (typeof ownerId === 'string' && ownerId.length > 0) {
        if (apartment.ownerId === null) {
          const owner = database.get('persons').find({id: ownerId}).value();

          if (owner && owner.id === ownerId) {
            if (owner.money >= apartment.cost) {
              database.get('persons').find({id: ownerId}).assign({
                money: owner.money - apartment.cost
              }).write();

              apartment.ownerId = ownerId;

              database.get('apartments').find({id}).assign(apartment).write();

              res.json(apartment);
            } else {
              res.status(403).send('403 Forbidden - The requested "Person" to be made an "Apartment" owner does not have enough money.');
            }
          } else {
            res.status(404).send('404 Not Found - The requested "Person" to be made an "Apartment" owner was not found.');
          }
        } else {
          res.status(403).send('403 Forbidden - The "Apartment" already has an owner.');
        }
      } else if (ownerId === null) {
        apartment.ownerId = ownerId;

        database.get('apartments').find({id}).assign(apartment).write();

        res.json(apartment);
      }
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
      const apartment: IApartment = {cost, id, ownerId: null};

      const {database} = res.locals;
      database.get('apartments').push(apartment).write();

      res.status(201).json(apartment);
    } else {
      res.status(400).send('400 Bad Request - Trying to create an "Apartment" with an incomplete payload.');
    }
  });

export {apartmentsRouter};
