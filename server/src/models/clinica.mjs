const clinica = (sequelize, DataTypes) => {
    const Clinica = sequelize.define('Clinica', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        localizacao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        horarios: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
    }, {
        tableName: 'clinicas',
        timestamps: false,
    });

    return Clinica;
};

export default clinica;