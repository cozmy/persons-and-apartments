import * as uniqid from 'uniqid';
import {databaseConnector, databaseName} from '../database';
import {IPerson} from './interface';

// TODO we need some sort of validation
export const personsPersistence = {
  create({firstName = '', lastName = '', money = 0}): IPerson {
    const id = uniqid('person-');

    const person = {firstName, id, lastName, money};

    databaseConnector(databaseName).get('persons').push(person).write();

    return person;
  },
  ['delete'](id): IPerson {
    const personToDelete = databaseConnector(databaseName).get('persons').find({id});

    databaseConnector(databaseName).get('persons').remove({id}).write();

    return personToDelete;
  },
  read(id = null): IPerson {
    if (id === null) {
      return databaseConnector(databaseName).get('persons');
    } else {
      return databaseConnector(databaseName).get('persons').find({id});
    }
  },
  update(id, {firstName = '', lastName = '', money = 0}) {
    const personToUpdate = databaseConnector(databaseName).get('persons').find({id});
    personToUpdate.assign({firstName, lastName, money}).write();

    return personToUpdate;
  }
};
