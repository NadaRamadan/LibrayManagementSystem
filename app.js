const express = require("express");
const app = express();
const { sequelize } = require("./dbconfig");

app.use(express.json());

app.use("/books", require("./routes/bookRoutes"));

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
