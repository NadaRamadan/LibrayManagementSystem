const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LibraryDB', 'testuser', 'Test@1234', {
  dialect: 'mssql',
  host: 'localhost',
  dialectOptions: {
    options: {
      trustedConnection: true
    }
  }
});

module.exports = { sequelize };
