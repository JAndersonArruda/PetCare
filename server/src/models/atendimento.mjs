const atendimento = (sequelize, DataTypes) => {
    const Atendimento = sequelize.define('Atendimento', {
        profissionalId: {
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
        dataAtendimento: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'atendimentos',
        timestamps: false,
    });

    return Atendimento;
};

export default atendimento;
