'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define('Guru', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pelajaran: DataTypes.STRING,
    kelas: DataTypes.INTEGER,
    bidangId: DataTypes.INTEGER
  }, {});
  Guru.associate = function(models) {
    // associations can be defined here
    Guru.belongsTo(sequelize.models.Bidang)
  };
  Guru.beforeCreate(guru => {
    const baru = ' (newTeacher)'
    guru.nama = guru.nama + baru
    return guru
  })

  Guru.beforeUpdate(guru => {
    const baru = ' (Edit)'
    guru.nama = guru.nama + baru
  })
  return Guru;
};