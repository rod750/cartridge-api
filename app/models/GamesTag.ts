module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('GamesTag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gameId: {
            type: DataTypes.INTEGER
        },
        tagId: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {});
    
    Model.associate = (models: any) => {
        Model.belongsTo(models.Game, { as: 'game' });
        Model.belongsTo(models.Tag, { as: 'tag' });
    };

    return Model;
};
