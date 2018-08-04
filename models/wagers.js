module.exports = function(sequelize, DataTypes) {
  var Wagers = sequelize.define("Wagers", {
    match_wager: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    match_returns: {
      type: DataTypes.INTEGER,
    }
  });
  return Wagers;
};

