const avaliacoes = (sequelize, DataTypes) => {
    const Avaliacoes = sequelize.define('Avaliacoes', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        serviceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'services',
                key: 'id',
            },
            primaryKey: true,
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },

    }, {
        tableName: 'avaliacoes',
    });

    return Avaliacoes;
};

export default avaliacoes;
