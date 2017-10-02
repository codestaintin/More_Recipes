const votingModel = (sequelize, DataTypes) => {
  const Voting = sequelize.define('Voting', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Voting.associate = (models) => {
    Voting.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Voting.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Voting;
};

export default votingModel;

