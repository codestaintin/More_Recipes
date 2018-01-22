import bcrypt from 'bcrypt-nodejs';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites'
    });
    User.hasMany(models.Voting, {
      foreignKey: 'userId',
      as: 'votings'
    });
  };
  /**
   * Method for comparing passwords
   */
  User.prototype.comparePassword = (user, password) => bcrypt.compareSync(password, user.password);
  /**
   * Hook for hashing password before creating a new user
   */
  User.hook('beforeCreate', (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  /**
   * Hook for hashing password before creating a new user
   */
  User.hook('beforeUpdate', (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.newPassword, salt);
    user.newPassword = hash;
  });
  /**
   * auth validation rules for user creation and login
   * @returns { object } object
   */
  User.createRules = () => ({
    firstName: 'required|alpha',
    lastName: 'required|alpha',
    username: 'required|min:6',
    email: 'required|email',
    password: 'required|min:6'
  });
  User.loginRules = () => ({
    email: 'required|email',
    password: 'required'
  });
  return User;
};

export default userModel;
