'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação da tabela 'DonoPet'
    await queryInterface.createTable('DonoPet', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      petId: {
        type: Sequelize.UUID,
        references: {
          model: 'pets',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('DonoPet', {
      fields: ['userId', 'petId'],
      type: 'primary key',
      name: 'primary_key_user_pet',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DonoPet');
  }
};

