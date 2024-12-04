'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrabalhaClinica', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      clinicaId: {
        type: Sequelize.UUID,
        references: {
          model: 'clinicas',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false
    });

    await queryInterface.addConstraint('TrabalhaClinica', {
      fields: ['userId', 'clinicaId'],
      type: 'primary key',
      name: 'primary_key_user_clinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrabalhaClinica');
  }
};
