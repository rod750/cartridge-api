'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Developers', [
            {
                name: 'Nintendo'
            },
            {
                name: 'Rockstar Games'
            },
            {
                name: 'Activision Blizzard'
            },
            {
                name: 'Sony Computer Entertainment'
            }
        ]);
    }
};
