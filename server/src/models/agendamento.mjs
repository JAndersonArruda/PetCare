const agendamento = (sequelize, DataTypes) => {
    const Agendamento = sequelize.define('Agendamento', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true
        },
        petId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true
        },
        serviceId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
            primaryKey: true
        },
        clinicaId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true
        },
        dataAgendamento: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
    }, {
        tableName: 'agendamentos',
        timestamps: false,
    });

    return Agendamento;
};

export default agendamento;
