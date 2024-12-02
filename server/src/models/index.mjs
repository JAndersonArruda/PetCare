import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import userModel from './user.mjs';
import petModel from './pet.mjs';
import vacinaModel from './vacina.mjs';
import serviceModel from './service.mjs';
import clinicaModel from './clinica.mjs';
import avaliacaoModel from './avaliacao.mjs';
import DonoPetModel from './DonoPet.mjs';

const user = userModel(sequelize, DataTypes);
const pet = petModel(sequelize, DataTypes);
const vacina = vacinaModel(sequelize, DataTypes);
const service = serviceModel(sequelize, DataTypes);
const clinica = clinicaModel(sequelize, DataTypes);
const avaliacao = avaliacaoModel(sequelize, DataTypes);
const DonoPet = DonoPetModel(sequelize, DataTypes);


user.belongsToMany(pet, { 
    through: DonoPet,
    foreignKey: 'userId',
    otherKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
pet.belongsToMany(user, { 
    through: DonoPet,
    foreignKey: 'petId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export {user, pet, vacina, service, clinica, avaliacao, DonoPet, sequelize};