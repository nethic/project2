module.exports = function(sequelize, DataTypes) {
  var Wagers = sequelize.define("Wagers", {
    wager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    wager_team: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wager_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wager_returns: {
      type: DataTypes.INTEGER,
    }
  });
  return Wagers;
};

