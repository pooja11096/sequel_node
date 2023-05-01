'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_table.init({
    
    name: DataTypes.STRING,
    class_id: DataTypes.INTEGER
  }, {
    paranoid:true,
    sequelize,
    modelName: 'student_table',
  });
  return student_table;
};