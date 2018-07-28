module.exports = function(sequelize, DataTypes) {
  var Accounts = sequelize.define("Accounts", {
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_points: {
      type: DataTypes.INT,
      allowNull: false
    }
  });
  return Accounts;
};