const TrabalhaClinica = (sequelize, DataTypes) => {
    const TrabalhaClinica = sequelize.define('TrabalhaClinica', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        clinicaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        }
    }, {
        tableName: 'TrabalhaClinica',
        timestamps: false
    });

    return TrabalhaClinica;
};

export default TrabalhaClinica;