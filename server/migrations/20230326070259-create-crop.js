'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Crops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      seedlingAge: {
        type: Sequelize.INTEGER
      },
      harvestAge: {
        type: Sequelize.INTEGER
      },
      harvestTime: {
        type: Sequelize.INTEGER
      },
      cropAge: {
        type: Sequelize.INTEGER
      },
      cropProdWeight: {
        type: Sequelize.NUMERIC
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Crops');
  }
};