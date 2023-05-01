'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init({
    name: DataTypes.INTEGER,
    email: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    // timestamps:false,
    modelName: 'employee',
  });
  return employee;
};