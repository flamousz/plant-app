'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TypeTaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TypeTasks',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      SubTaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubTasks',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      TerrainId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Terrains',
          key: 'id',
          onDelete: 'cascade'
        }
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
    await queryInterface.dropTable('Tasks');
  }
};