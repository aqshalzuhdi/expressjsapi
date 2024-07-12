'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.addColumn(
					'users',
					'address',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t },
				),
				queryInterface.addColumn(
					'users',
					'favoriteColor',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t },
				),
			]);
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.removeColumn('users', 'address', { transaction: t }),
				queryInterface.removeColumn('users', 'favoriteColor', {
					transaction: t,
				}),
			]);
		});
	},
};
