import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import userModel from './user.mjs';
import petModel from './pet.mjs';
import clinicaModel from './clinica.mjs';
import DonoPetModel from './DonoPet.mjs';
import TrabalhaClinicaModel from './TrabalhaClinica.mjs';
import serviceModel from './service.mjs';

const user = userModel(sequelize, DataTypes);
const pet = petModel(sequelize, DataTypes);
const clinica = clinicaModel(sequelize, DataTypes);
const DonoPet = DonoPetModel(sequelize, DataTypes);
const TrabalhaClinica = TrabalhaClinicaModel(sequelize, DataTypes);
const service = serviceModel(sequelize, DataTypes);


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


user.belongsToMany(clinica, {
    through: TrabalhaClinica,
    foreignKey: 'userId',
    otherKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

clinica.belongsToMany(user, {
    through: TrabalhaClinica,
    foreignKey: 'clinicaId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

clinica.hasMany(service, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
service.belongsTo(clinica, {
foreignKey: 'clinicaId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});
  


export {user, pet, clinica, DonoPet, service, TrabalhaClinica, sequelize};