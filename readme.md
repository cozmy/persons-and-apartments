### How to create a new `Person`

```
const whenPersonCreated = fetch('http://www.cosminababei.eu:8080/api/persons', {
  body: JSON.stringify({
    firstName: 'Cosmin',
    lastName: 'Ababei',
    money: 10000
  }),
  headers: {
    Authorization: 'authorization-token',
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

whenPersonCreated
  .then(response => response.json())
  .then(person => console.log(person));
```

### How to create a new `Apartment`

```
const whenApartmentCreated = fetch('http://www.cosminababei.eu:8080/api/apartments', {
  body: JSON.stringify({
    cost: 7750
  }),
  headers: {
    Authorization: 'authorization-token',
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

whenApartmentCreated
  .then(response => response.json())
  .then(apartment => console.log(apartment));
```

### How to move a `Person` into an `Apartment`

```
const whenPersonMovedIntoApartment = fetch('http://www.cosminababei.eu:8080/api/apartments/apartment-0lj6m2vwl4', {
  body: JSON.stringify({
    ownerId: 'person-0lj6m2uzj7'
  }),
  headers: {
    Authorization: 'authorization-token',
    'Content-Type': 'application/json'
  },
  method: 'PUT'
});

whenPersonMovedIntoApartment
  .then(response => response.json())
  .then(apartment => console.log(apartment));
```
