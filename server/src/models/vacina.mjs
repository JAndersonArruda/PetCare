const vacina = (sequelize, DataTypes) => {
    const Vacina = sequelize.define('Vacina', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        validade: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fabricante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
        },
    }, {
        tableName: 'vacinas',
        timestamps: false,
    });

    return Vacina;
};

export default vacina;