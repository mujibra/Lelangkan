'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const fs = require('fs')

     let data = JSON.parse(fs.readFileSync('./users.JSON', 'utf-8'))
     data.forEach(element => {
         element.createdAt = new Date()
         element.updatedAt = new Date()
     });
   return queryInterface.bulkInsert('Users', data, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
