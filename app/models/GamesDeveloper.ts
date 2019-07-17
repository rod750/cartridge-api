module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('GamesDeveloper', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gameId: {
            type: DataTypes.INTEGER
        },
        developerId: {
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
        Model.belongsTo(models.Developer, { as: 'developer' });
    };

    return Model;
};
