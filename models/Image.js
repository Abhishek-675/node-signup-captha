const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Image = sequelize.define('image', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    filepath: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });


// const Image = sequelize.define('image', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     imageData: {
//       type: Sequelize.BLOB('long'),
//       allowNull: false
//     }
//   });

module.exports = Image;
  