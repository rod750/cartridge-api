module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        releaseYear: DataTypes.INTEGER,
        platformId: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        coverUrl: DataTypes.STRING
    });

    Model.associate = (models: any) => {
        Model.belongsTo(models.Platform, { as: 'platform' });
        Model.belongsToMany(models.Developer, { as: 'developers', through: 'GamesDevelopers', foreignKey: 'gameId', otherKey: 'developerId' });
        Model.belongsToMany(models.Tag, { as: 'tags', through: 'GamesTags', foreignKey: 'gameId', otherKey: 'tagId' });
    };

    return Model;
};
