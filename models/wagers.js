module.exports = function(sequelize, DataTypes) {
  var Wagers = sequelize.define("Wagers", {
    match_wager: {
      type: DataTypes.INT,
      allowNull: false
    },
    match_returns: {
      type: DataTypes.INT,
    }
  });
  return Wagers;
};

