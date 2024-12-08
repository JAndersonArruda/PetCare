import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'
import userModel from './user.mjs';
import petModel from './pet.mjs';
import clinicaModel from './clinica.mjs';
import DonoPetModel from './DonoPet.mjs';
import TrabalhaClinicaModel from './TrabalhaClinica.mjs';
import serviceModel from './service.mjs';
import horarioAtendimentoModel from './horario.mjs';
import vacinaModel from './vacina.mjs';
import atendimentoModel from './atendimento.mjs';
import agendamentoModel from './agendamento.mjs';
import avaliacoesModel from './avaliacoes.mjs';


const user = userModel(sequelize, DataTypes);
const pet = petModel(sequelize, DataTypes);
const clinica = clinicaModel(sequelize, DataTypes);
const DonoPet = DonoPetModel(sequelize, DataTypes);
const TrabalhaClinica = TrabalhaClinicaModel(sequelize, DataTypes);
const service = serviceModel(sequelize, DataTypes);
const horariosAtendimento = horarioAtendimentoModel(sequelize, DataTypes);
const vacina = vacinaModel(sequelize, DataTypes);
const atendimento = atendimentoModel(sequelize, DataTypes);
const agendamento = agendamentoModel(sequelize, DataTypes);
const avaliacao = avaliacoesModel(sequelize, DataTypes);


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
  
clinica.hasMany(horariosAtendimento, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
horariosAtendimento.belongsTo(clinica, {
foreignKey: 'clinicaId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});

service.hasMany(vacina, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
vacina.belongsTo(service, {
foreignKey: 'serviceId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});

user.hasMany(atendimento, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

atendimento.belongsTo(user, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

pet.hasMany(atendimento, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

atendimento.belongsTo(pet, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

service.hasMany(atendimento, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

atendimento.belongsTo(service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


user.hasMany(agendamento, { foreignKey: 'userId' });
pet.hasMany(agendamento, { foreignKey: 'petId' });
service.hasMany(agendamento, { foreignKey: 'serviceId' });
clinica.hasMany(agendamento, { foreignKey: 'clinicaId' });

agendamento.belongsTo(user, { foreignKey: 'userId' });
agendamento.belongsTo(pet, { foreignKey: 'petId' });
agendamento.belongsTo(service, { foreignKey: 'serviceId' });
agendamento.belongsTo(clinica, { foreignKey: 'clinicaId' });

user.belongsToMany(service, { 
    through: avaliacao,
    foreignKey: 'userId',
    otherKey: 'serviceId'
});

service.belongsToMany(user, { 
    through: avaliacao,
    foreignKey: 'serviceId',
    otherKey: 'userId'
});

export {user, pet, clinica, DonoPet, service, TrabalhaClinica, sequelize};