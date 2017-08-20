### How to create a new `Person`

```
const whenPersonCreated = fetch('http://localhost:3000/api/persons', {
  body: JSON.stringify({
    firstName: 'first name',
    lastName: 'last name',
    money: 3000
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
const whenApartmentCreated = fetch('http://localhost:3000/api/apartments', {
  body: JSON.stringify({
    cost: 500
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
const whenApartmentCreated = fetch('http://localhost:3000/api/apartments', {
  body: JSON.stringify({
    cost: 500
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
