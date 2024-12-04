const TrabalhaClinica = (sequelize, DataTypes) => {
    const TrabalhaClinica = sequelize.define('TrabalhaClinica', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clinicaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        }    
    }, {
        tableName: 'TrabalhaClinica',
        timestamps: false
    });

    return TrabalhaClinica;
};

export default TrabalhaClinica;