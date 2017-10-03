import bcrypt from 'bcrypt-nodejs';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
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
  User.prototype.comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  };
  /**
   * Hook for hashing password
   */
  User.hook('beforeCreate', (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  /**
   * User validation rules for user creation and login
   */
  User.createRules = () => {
    return {
      fullname: 'required|min:6|alpha',
      username: 'required|min:6',
      email: 'required|email',
      password: 'required|min:6'
    };
  };
  User.loginRules = () => {
    return {
      email: 'required|email',
      password: 'required'
    };
  };
  return User;
};

export default userModel;
