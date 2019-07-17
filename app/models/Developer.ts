module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Developer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });

    return Model;
};
