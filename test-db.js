const { sequelize } = require("./dbconfig");
require("./models/book");
require("./models/borrower");
require("./models/loan");




(async () => {
  try {
  sequelize.sync({ force: true });
    console.log("Database synced");
    process.exit();
  } catch (err) {
    console.error("Error at creating", err);
  }
})();
