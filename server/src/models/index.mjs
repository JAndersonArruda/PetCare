import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import userModel from './user.mjs';
import petModel from './pet.mjs';
import vacinaModel from './vacina.mjs';
import serviceModel from './service.mjs';
import clinicaModel from './clinica.mjs';
import avaliacaoModel from './avaliacao.mjs';

const user = userModel(sequelize, DataTypes);
const pet = petModel(sequelize, DataTypes);
const vacina = vacinaModel(sequelize, DataTypes);
const service = serviceModel(sequelize, DataTypes);
const clinica = clinicaModel(sequelize, DataTypes);
const avaliacao = avaliacaoModel(sequelize, DataTypes);


export {user, pet, vacina, service, clinica, avaliacao, sequelize};