'use strict';
const {dateTimeFormat} = require('../helpers/foglobal')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.Book, {foreignKey: 'book_id', as: 'book'})
      // User.hasMany(models.Book, {foreignKey: 'id', as: 'book'})
      // User.hasMany(models.Book, {foreignKey: 'book_id', as: 'book'})
      // User.hasMany(models.Book, {foreignKey: 'book_id', as: 'book'})
      // User.belongsTo(models.Book, {foreignKey: 'book_id'})

      // User.belongsTo(models.Book, {foreignKey: 'book_id', as: 'books'})
      // User.hasOne(models.Book, {foreignKey: 'id', as: 'book'})
      // User.hasMany(models.Book, {foreignKey: 'id', as: 'book'})
      User.belongsToMany(models.Book, {
        through: 'BookUser',
        foreignKey: 'user_id',
        as: 'books'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    // book_id: DataTypes.INTEGER,
    // books: {
    //   field: 'book_id',
    //   type: DataTypes.INTEGER,
    //   get: function() {
    //     return this.getDataValue('book_id')
    //   }
    // },
    created_at: {
      field: 'createdAt',
      type: DataTypes.DATE,
      get: function() { // or use get(){ }
        return dateTimeFormat(this.getDataValue('created_at'))
      }
    },
    updated_at: {
      field: 'updatedAt',
      type: DataTypes.DATE,
      get: function() { // or use get(){ }
        return dateTimeFormat(this.getDataValue('updated_at'))
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['book_id', 'createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        'books'
      ],
    },
    // scopes: {
    //   excludeScope: {
    //     attributes: {
    //       exclude: ['book_id', 'createdAt', 'updatedAt']
    //     },
    //     include: [
    //       'book'
    //     ]
    //   }
    // }

    //Has password field in results:
    // User.scope('withPassword').findAll()
  });
  return User;
};