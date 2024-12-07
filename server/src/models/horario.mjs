const horario = (sequelize, DataTypes) => {
    const Horario = sequelize.define('Horario', {
        clinicaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        tableName: 'horarios',
        timestamps: false,
    });

    return Horario;
};

export default horario;
