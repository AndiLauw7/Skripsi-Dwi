"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_registrasis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tgl_registrasi: {
        type: Sequelize.DATE,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ["laki-laki", "perempuan"],
        defaultValue: "laki-laki",
      },
      tempat_lahir: {
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
      },
      agama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      nomer_hp: {
        type: Sequelize.STRING,
      },
      lulusan: {
        type: Sequelize.STRING,
      },
      nisn: {
        type: Sequelize.STRING,
      },
      nama_ibu: {
        type: Sequelize.STRING,
      },
      tempat_lahirIbu: {
        type: Sequelize.STRING,
      },
      pekerjaanIbu: {
        type: Sequelize.STRING,
      },
      nama_ayah: {
        type: Sequelize.STRING,
      },
      tempat_lahirAyah: {
        type: Sequelize.STRING,
      },
      pekerjaanAyah: {
        type: Sequelize.STRING,
      },
      createBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_registrasis");
  },
};
