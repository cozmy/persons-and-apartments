### How to create a new `Person`

```
const whenPersonCreated = fetch('http://localhost:3000/api/persons', {
  body: JSON.stringify({
    firstName: 'first name',
    lastName: 'last name',
    money: 3000
  }),
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

whenPersonCreated
  .then(response => response.json())
  .then(person => console.log(person));
```
