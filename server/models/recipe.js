const recipeModel = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    Recipe.hasMany(models.Voting, {
      foreignKey: 'recipeId',
      as: 'votings'
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });
  };
  Recipe.createRules = () => {
    return {
      name: 'required|min:4',
      description: 'required|min:4',
      ingredient: 'required|min:3',
      image: 'required'
    };
  };
  Recipe.updateRules = () => {
    return {
      name: 'required|min:4',
      description: 'required|min:4',
      ingredient: 'required|min:3',
      image: 'required'
    };
  };
  return Recipe;
};

export default recipeModel;
