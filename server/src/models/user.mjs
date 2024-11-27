export const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nome: {
            type: DataTypes.STRING
        },
        idade: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'users'
    });

    return User;
};