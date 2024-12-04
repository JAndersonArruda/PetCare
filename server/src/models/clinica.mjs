const clinica = (sequelize, DataTypes) => {
    const Clinica = sequelize.define('Clinica', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        tableName: 'clinicas',
        timestamps: false,
    });

    return Clinica;
};

export default clinica;