const DonoPet = (sequelize, DataTypes) => {
    const DonoPet = sequelize.define('DonoPet', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        petId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        }    
    }, {
        tableName: 'DonoPet'
    });

    return DonoPet;
};

export default DonoPet;