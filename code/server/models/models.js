const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Pacients = sequelize.define('pacient', {
    pacient_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    addres_id:{type: DataTypes.INTEGER},
    mail: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "PACIENT"},
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
    day: {type: DataTypes.STRING, allowNull: false},
    start_of_admission: {type: DataTypes.INTEGER, allowNull: false},
    end_of_reception:{type: DataTypes.INTEGER, allowNull: false},
})
const Records = sequelize.define('record', {
    record_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time:{type: DataTypes.INTEGER,allowNull: false},
})
const Prescriptions = sequelize.define('prescription', {
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

Doctors.hasMany(Records)
Records.belongsTo(Doctors)

Timetable.hasMany(Records)
Records.belongsTo(Timetable)

Records.hasOne(Prescriptions)
Prescriptions.belongsTo(Records)

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
