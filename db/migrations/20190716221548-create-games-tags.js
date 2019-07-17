'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('GamesTags',
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
            tagId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Tags'
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
        return queryInterface.dropTable('GamesTags');
    }
};
