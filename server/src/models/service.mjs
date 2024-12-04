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
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'services',
        timestamps: false,
    });

    return Service;
};

export default service;