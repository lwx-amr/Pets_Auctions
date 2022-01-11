require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3006,
  },
  database: {
    url: 'mongodb://localhost:27017/pets_auctions_test',
  },
};
