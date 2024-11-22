const pet = (sequelize, DataTypes) => {
    const Pet = sequelize.define('Pet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        raca: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
            },
        },
        porte: {
            type: DataTypes.ENUM('pequeno', 'medio', 'grande'),
            allowNull: false,
            validate: {
                isIn: [['pequeno', 'medio', 'grande']],
            },
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'pets',
        timestamps: true,
    })
};


export default pet;