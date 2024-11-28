const vacina = (sequelize, DataTypes) => {
    const Vacina = sequelize.define('Vacina', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dtAplicacao: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        validade: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'vacinas',
        timestamps: false,
    });

    return Vacina;
};

export default vacina;