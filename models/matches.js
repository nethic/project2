module.exports = function(sequelize, DataTypes) {
  var Matches = sequelize.define("Matches", {
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    match_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    match_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    match_status: {
      type: DataTypes.STRING,
      defaultValue: "not_started",
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
    team_A_wagers: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    team_B_wagers: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    team_A_odds: {
      type: DataTypes.FLOAT,
      defaultValue: 2.0,
      allowNull: false
    },
    team_B_odds: {
      type: DataTypes.FLOAT,
      defaultValue: 2.0,
      allowNull: false
    },
    match_winner: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  });
  return Matches;
};
