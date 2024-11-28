export const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
              isEmail: true,
            },
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('Cliente', 'Profissional'),
            allowNull: false,
        },
               
    }, {
        tableName: 'users'
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Pet, { foreignKey: 'idDono' });

        Usuario.hasMany(models.Avaliacao, { foreignKey: 'idCliente' });
    
        Usuario.belongsToMany(models.Servico, { 
          through: 'AgendaServico',
          foreignKey: 'emailCliente'
        });
    
        // Avaliações de serviços feitas pelos clientes
        Usuario.belongsToMany(models.Servico, {
          through: 'AvaliacoesServico',
          foreignKey: 'idCliente'
        });
      };
    

    return User;
};