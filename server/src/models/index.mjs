import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import userModel from './user.mjs';

const user = userModel(sequelize, DataTypes);

const db = {
    user,
    sequelize
};


export default db;