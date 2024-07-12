'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'book_id', {
      type: Sequelize.INTEGER,
      // allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      }
    })
    // await queryInterface.addColumn('Users', 'book_id',
    //   Sequelize.INTEGER,
    //   references: {
    //     model: 'Books',
    //     key: 'id'
    //   }
    // )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'book_id')
  }
};
