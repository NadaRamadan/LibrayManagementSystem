const { DataTypes } = require("sequelize");
const {sequelize} = require("../dbconfig.js");
const Book = require("./book");
const Borrower = require("./borrower");

const Loan = sequelize.define("Loan", {
  borrowedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueAt: {
    type: DataTypes.DATE
  },
  returned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Book.hasMany(Loan);
Loan.belongsTo(Book);

Borrower.hasMany(Loan);
Loan.belongsTo(Borrower);

module.exports = Loan;
