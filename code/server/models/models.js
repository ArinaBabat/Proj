const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Pacients = sequelize.define('pacient', {
    pacient_id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, allowNull: false},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    address: { type: DataTypes.STRING},
    mail: {type: DataTypes.STRING, unique: true},
})
const Doctors = sequelize.define('doctor', {
    doctor_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING,allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "DOCTOR"},
})
const Timetable = sequelize.define('timetable', {
    timetable_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start: {type: DataTypes.DATE, allowNull: false},
    end: { type: DataTypes.DATE, allowNull: false},
})
const Records = sequelize.define('record', {
    record_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
})
const Prescriptions = sequelize.define('prescription', {
    record_id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      references: {
        model: 'records',
        key: 'record_id'
      }
    },
    diagnostic: {type: DataTypes.STRING},
    therapy: {type: DataTypes.STRING},
})
const Cabinets = sequelize.define('cabinet', {
    cabinet_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:{type: DataTypes.INTEGER, allowNull: false},
})
const Specialties = sequelize.define('speciality', {
    speciality_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


Doctors.hasOne(Pacients)
Pacients.belongsTo(Doctors)

Pacients.hasMany(Records)
Records.belongsTo(Pacients)

Timetable.hasMany(Records)
Records.belongsTo(Timetable)

Records.hasOne(Prescriptions, {
  foreignKey: 'record_id'
});
Prescriptions.belongsTo(Records, {
  foreignKey: 'record_id', foreignKeyConstraint: true
});

Cabinets.hasMany(Timetable)
Timetable.belongsTo(Cabinets)

Doctors.hasMany(Timetable)
Timetable.belongsTo(Doctors)

Specialties.hasMany(Cabinets)
Cabinets.belongsTo(Specialties)

Specialties.hasMany(Doctors)
Doctors.belongsTo(Specialties)


module.exports = {
    Pacients,
    Doctors,
    Timetable,
    Records,
    Prescriptions,
    Cabinets,
    Specialties
}
