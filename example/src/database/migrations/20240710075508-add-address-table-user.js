'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      // defaultValue: false,
    });
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Users', 'age');
    await queryInterface.removeColumn('Users', 'address');
	},
};
