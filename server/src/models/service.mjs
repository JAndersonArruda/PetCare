const service = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
            allowNull: false,
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        clinicaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
        },
    }, {
        tableName: 'services',
        timestamps: false,
    });

    return Service;
};

export default service;