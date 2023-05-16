'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
  },
};
