'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bidang = sequelize.define('Bidang', {
    nama: DataTypes.STRING
  }, {});
  Bidang.associate = function(models) {
    // associations can be defined here
    Bidang.hasMany(sequelize.models.Guru)
  };
  return Bidang;
};