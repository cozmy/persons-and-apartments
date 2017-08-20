const low = require('lowdb');

const inProduction = process.env.NODE_ENV === 'production';
const databaseName = '.' + (inProduction ? '' : '/dist') + '/db.json';

export {databaseName, low as databaseConnector};
