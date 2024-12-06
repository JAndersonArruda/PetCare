const DonoPet = (sequelize, DataTypes) => {
    const DonoPet = sequelize.define('DonoPet', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        petId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        }
    }, {
        tableName: 'DonoPet'
    });

    return DonoPet;
};

export default DonoPet;