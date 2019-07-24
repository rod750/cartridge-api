'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Games', [
            {
                name: 'Overwatch',
                platformId: 1,
                description: 'Overwatch assigns players into two teams of six, with each player selecting from a roster of over 30 characters, known as "heroes," each with a unique style of play whose roles are divided into three general categories that fit their purpose.',
                releaseYear: 2016,
                rating: 4,
                coverUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg'
            },
            {
                name: 'The Legend of Zelda: Breath of the Wild',
                platformId: 1,
                description: 'The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo.',
                releaseYear: 2017,
                rating: 5,
                coverUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg'
            },
            {
                name: 'The Elder Scrolls V: Skyrim',
                platformId: 1,
                description: 'The Elder Scrolls V: Skyrim is an action role-playing video game developed by Bethesda Game Studios.',
                releaseYear: 2011,
                rating: 4,
                coverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png'
            }
        ]);
    }
};
