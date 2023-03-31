'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CropAreas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      detailPlace: {
        type: Sequelize.STRING
      },
      CropId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Crops',
          key: 'id',
          
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('CropAreas');
  }
};