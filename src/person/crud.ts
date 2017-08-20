import * as uniqid from 'uniqid';
import {IPerson} from './interface';

export const personsPersistence = {
  create(database, {firstName = '', lastName = '', money = 0}): IPerson {
    const id = uniqid('person-');

    const person = {firstName, id, lastName, money};

    database.get('persons').push(person).write();

    return person;
  },
  ['delete'](database, id): IPerson {
    const personToDelete = database.get('persons').find({id});

    database.get('persons').remove({id}).write();

    return personToDelete;
  },
  read(database, id = null): IPerson {
    if (id === null) {
      return database.get('persons');
    } else {
      return database.get('persons').find({id});
    }
  },
  update(database, id, {firstName = '', lastName = '', money = 0}) {
    const personToUpdate = database.get('persons').find({id});
    personToUpdate.assign({firstName, lastName, money}).write();

    return personToUpdate;
  }
};
