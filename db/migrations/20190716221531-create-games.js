'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Games',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: Sequelize.STRING,
            releaseYear: Sequelize.INTEGER,
            platformId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Platforms'
                    },
                    key: 'id'
                }
            },
            rating: {
                type: Sequelize.INTEGER,
                default: 0
            },
            coverUrl: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Games');
    }
};
