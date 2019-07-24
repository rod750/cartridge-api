'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Tags', [
            {
                name: 'Action'
            },
            {
                name: 'RPG'
            },
            {
                name: 'FPS'
            },
            {
                name: 'Simulation'
            }
        ]);
    }
};
