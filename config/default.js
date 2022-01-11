require('dotenv').config();

module.exports = {
  app: {
    name: 'Pets Auction',
    baseUrl: 'http://localhost:',
    port: process.env.PORT || 3000,
  },
  client: {
    url: 'http://localhost:3000',
  },
  database: {
    url: 'mongodb://localhost:27017/pets_auctions',
  },
};
