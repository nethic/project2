module.exports = function(sequelize, DataTypes) {
  var Matches = sequelize.define("Matches", {
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
<<<<<<< HEAD
      primaryKey: true,
=======
      primaryKey: true
>>>>>>> master
    },
    match_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    match_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
<<<<<<< HEAD
    match_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
=======
>>>>>>> master
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
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
  });
  return Matches;
};