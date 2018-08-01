module.exports = function(sequelize, DataTypes) {
  var Accounts = sequelize.define("Accounts", {
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoincrement: true
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Accounts;
};