export const profissional = (sequelize, DataTypes) => {
    const Profissional = sequelize.define('Profissional', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: true
            }
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING
        },
        endereco: {
            type: DataTypes.STRING,
        },
        tipo: {
            type: DataTypes.ENUM("cliente", "profissional"),
            allowNull: false,
        }
    }, {
        tableName: 'users'
    });

    return User;
};