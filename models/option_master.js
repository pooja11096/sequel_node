'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  option_master.init({

    option_name: DataTypes.STRING,
    selection_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    sequelize,
    modelName: 'option_master',
  });
  return option_master;
};