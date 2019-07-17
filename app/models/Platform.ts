module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Platform', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING
    });

    Model.associate = (models: any) => {
        Model.hasMany(models.Game, { as: 'games', sourceKey: 'id', foreignKey: 'platformId' });
    };

    return Model;
};
