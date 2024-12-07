const DonoPet = (sequelize, DataTypes) => {
    const DonoPet = sequelize.define('DonoPet', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        petId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true,
        }
    }, {
        tableName: 'DonoPet',
        timestamps: false
    });

    return DonoPet;
};

export default DonoPet;