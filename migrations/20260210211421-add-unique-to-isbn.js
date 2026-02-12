'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Make sure title and author are NOT NULL
    await queryInterface.changeColumn('Books', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Books', 'author', {
      type: Sequelize.STRING,
      allowNull: false
    });

    // Add UNIQUE index safely for MSSQL
    await queryInterface.sequelize.query(`
      IF NOT EXISTS (
        SELECT * FROM sys.indexes 
        WHERE name = 'unique_isbn_constraint' 
        AND object_id = OBJECT_ID('Books')
      )
      CREATE UNIQUE INDEX unique_isbn_constraint
      ON Books(isbn)
    `);
  },

  async down(queryInterface, Sequelize) {
    // Drop the index if it exists
    await queryInterface.sequelize.query(`
      IF EXISTS (
        SELECT * FROM sys.indexes 
        WHERE name = 'unique_isbn_constraint' 
        AND object_id = OBJECT_ID('Books')
      )
      DROP INDEX unique_isbn_constraint ON Books
    `);
  }
};
