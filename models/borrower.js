const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Borrower = sequelize.define("Borrower", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true } 

  },
  registeredDate:{
    type:DataTypes.DATE,
      defaultValue: DataTypes.NOW

  },
  membershipId: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
}

});

module.exports = Borrower;