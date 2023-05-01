'use strict';
const {faker} = require('@faker-js/faker');

const classData = [...Array(4)].map((data)=>({
  name: faker.random.alpha(),
  createdAt: new Date(),
  updatedAt: new Date()
}))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('class_tables', classData, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('class_tables', null, {});

  }
};
