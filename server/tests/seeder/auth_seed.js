import db from '../../models';

const User = db.User;

const seeder = {
  emptyUserTable(done) {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(firstName, lastName, username, email, password, checkPassword) {
    return {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword: checkPassword
    };
  },
  setLogin(email, password) {
    return { email, password };
  },
  addUser(done) {
    User.create({
      firstName: 'Isioye',
      lastName: 'Mohammed',
      username: 'mohzaky',
      email: 'mohzak@gmail.com',
      password: 'password'
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default seeder;
