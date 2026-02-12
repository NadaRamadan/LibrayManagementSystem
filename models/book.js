const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Book = sequelize.define('Book',{
   
    title:{
        type : DataTypes.STRING,
        allowNull: false

    },
author:{
    type: DataTypes.STRING,
    allowNull: false
},
 isbn:{
        type:DataTypes.STRING,
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    shelfLocation:{
        type: DataTypes.STRING,

    },
   


},
 {indexes: [
  {
    unique: true,
    fields: ['isbn']
  }
]

});

module.exports = Book;