'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'refresh_token', {
			type: Sequelize.TEXT,
			after: 'id'
		})
		// return queryInterface.sequelize.transaction(t => {
		// 	return Promise.all([
		// 		queryInterface.addColumn(
		// 			'users',
		// 			'address',
		// 			{
		// 				type: Sequelize.DataTypes.STRING,
		// 			},
		// 			{ transaction: t },
		// 		),
		// 		queryInterface.addColumn(
		// 			'users',
		// 			'favoriteColor',
		// 			{
		// 				type: Sequelize.DataTypes.STRING,
		// 			},
		// 			{ transaction: t },
		// 		),
		// 	]);
		// });
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
