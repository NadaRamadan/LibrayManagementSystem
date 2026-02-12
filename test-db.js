const { sequelize } = require("./dbconfig");
require("./models/book");
require("./models/borrower");
require("./models/loan");




(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced");
    process.exit();
  } catch (err) {
    console.error("Error at creating", err);
  }
})();
