import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import { user as userModel } from './user.mjs';
import petModel from './pet.mjs';

const user = userModel(sequelize, DataTypes);
const pet = petModel(sequelize, DataTypes);


export {user, pet, sequelize};