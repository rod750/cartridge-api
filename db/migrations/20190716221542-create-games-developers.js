'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('GamesDevelopers',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            gameId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Games'
                    },
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            developerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Developers'
                    },
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('GamesDevelopers');
    }
};
