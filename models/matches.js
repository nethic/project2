module.exports = function(sequelize, DataTypes) {
  var Matches = sequelize.define("Matches", {
    match_id: {
      type: DataTypes.INT,
      allowNull: false,
      primaryKey: true
    },
    match_name: {
      type: DataType.STRING,
      allowNull: false
    },
    match_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    team_A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    match_odds: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5,
      allowNull: false
    },
    match_result: {
      type: DataTypes.BOOLEAN
    },
  });
  return Matches;
};