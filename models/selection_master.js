'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class selection_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  selection_master.init({
    selection_name: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'selection_master',
  });
  return selection_master;
};