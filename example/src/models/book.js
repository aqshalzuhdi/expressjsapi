'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.hasMany(models.User, {foreignKey: 'book_id', as: 'user'})
      // Book.belongsTo(models.User, {foreignKey: 'id'})
      // Book.hasMany(models.User, {foreignKey: 'book_id', as: 'users'})
      // Book.belongsTo(models.User, {foreignKey: 'id'})
      // Book.belongsTo(models.User, {foreignKey: 'book_id', as: 'users'})
      Book.belongsToMany(models.User, {through: 'BookUser', foreignKey: 'book_id', as: 'users'})
    }
  }
  Book.init({
    name: DataTypes.STRING,
    isbn: DataTypes.STRING,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    defaultScope: {
      // attributes: {
      //   exclude: ['BookUsers']
      // },
      include: [
        // 'users'
      ]
    },
  });
  return Book;
};