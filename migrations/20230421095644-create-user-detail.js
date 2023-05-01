'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW') 
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP")

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW') 
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP")


      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_details');
  }
};