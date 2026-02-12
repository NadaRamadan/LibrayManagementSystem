module.exports = {
  development: {
    username: "testuser",
    password: "Test@1234",
    database: "LibraryDB",
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
      options: {
        trustedConnection: true
      }
    }
  }
};
