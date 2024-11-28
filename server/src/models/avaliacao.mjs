const avaliacao = (sequelize, DataTypes) => {
    const Avaliacao = sequelize.define('Avaliacao', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
};

export default avaliacao;